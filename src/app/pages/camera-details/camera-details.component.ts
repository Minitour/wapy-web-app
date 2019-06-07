import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import * as h337 from 'heatmap.js';
import { StatData, GraphData, TableData } from '../dashboard/dashboard.component';
import { AngularFireFunctions } from '@angular/fire/functions';
import { DatePipe } from '@angular/common';
import { Product } from '../products/products.component';
import { DateAdapter } from '@angular/material';
import { defineBase } from '@angular/core/src/render3';

@Component({
  selector: 'app-camera-details',
  templateUrl: './camera-details.component.html',
  styleUrls: ['./camera-details.component.scss']
})
export class CameraDetailsComponent implements OnInit, OnDestroy, AfterViewInit {




  @ViewChild('map') map: ElementRef;

  cameraName: string = ""
  cameraStatus: boolean = false;
  lastPingTime: number = 0
  isCameraOffline: boolean = false;
  isUpdatingStatus: boolean = false;



  image: string

  products: Array<any> = []
  heatmap: Array<any> = []

  isLoading: boolean = true
  stats: Array<StatData> = []
  graphs: Array<GraphData> = []
  tables: Array<TableData> = []
  productLookupTable: Map<string, Product> = new Map();

  private _id: string;
  private sub: any;

  get id() {
    return this._id;
  }

  set id(newValue: string) {
    this._id = newValue
    // update layout
    this.didSetId()

  }

  constructor(private db: AngularFirestore,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private fns: AngularFireFunctions) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  async didSetId() {
    this.isLoading = true;
    // GET DATA FROM FIREBASE

    const document = await this.db.collection('cameras').doc(this._id).ref.get();
    if (!document.exists) { return }
    const data = document.data();
    this.cameraName = data.name;
    this.image = data.image;
    this.heatmap = data.heatmap;
    this.lastPingTime = data.last_ping;

    if (data.camera_enabled) {
      this.cameraStatus = data.camera_enabled;
    }

    const productIds = data.mmo.objects;
    for (let prod of productIds) {
      try {
        let doc = await this.db.collection('products').doc(prod.id).ref.get();
        const data = doc.data()
        this.products.push(data);
        this.productLookupTable[doc.id] = {
          id: doc.id,
          name: data.name,
          image: data.image,
          createdAt: data.created_at.toDate()
        };
      } catch {
        this.productLookupTable[prod.id] = {
          id: prod.id,
          name: "Deleted Product",
          image: null,
          createdAt: null
        };
      }
    }



    // GET DATA FROM ANALYTICS SERVER

    const date = new Date();
    const timestamp = this.datePipe.transform(date, "yyyy-MM-dd hh:mm:ss");

    console.log(timestamp)

    // get dashboard data
    const getDashboard = this.fns.httpsCallable("getBoxDashboard");
    const results = await getDashboard({
      numberOfDays: 7,
      toTime: timestamp,
      cameraId: this._id
    }).toPromise();

    console.log(results);

    if (results.code != 200) {
      this.isLoading = false;
      return
    }
    // GET STATS
    const stats = results.data.box.stats;
    for (let item of stats) {
      const productId = item.productId;
      var alteredTitle = item.title;
      if (productId) {
        const product = this.productLookupTable[productId];
        alteredTitle = alteredTitle.split(productId).join(`${product.name}`);
      }

      this.stats.push({
        title: alteredTitle,
        value: item.value,
        icon: item.icon,
        iconBgColor: item.iconBgColor,
        iconColor: 'white',
        diffValue: item.diffValue,
        isPositive: item.isPositive,
        footerText: item.footerText,
        showFooter: item.showFooter
      });
    }

    // LOAD GRAPHS
    const graphs = results.data.box.graphs;

    for (let item of graphs) {
      if (!item.options) {
        item.options = {
          responsive: true,
          maintainAspectRatio: false
        }
      }

      const graph = {
        type: item.type,
        name: item.name,
        header: item.header,
        data: item.data,
        options: item.options
      };
      console.log(graph)
      this.graphs.push(graph);
    }

    // LOAD TABLES
    const tables = results.data.box.tables;

    // for each table
    for (let item of tables) {
      let values = item.values;

      // for each row
      for (let i = 0; i < values.length; i++) {
        // for each column
        for (let j = 0; j < values[i].length; j++) {
          // get product id
          let productId = values[i][j];
          let product = this.productLookupTable[productId];

          // if product name is not undefined
          if (product) {
            values[i][j] = {
              linkable: true,
              value: product.name,
              url: `product/${product.id}`
            }
          }
        }
      }
      this.tables.push({
        title: item.title,
        header: item.header,
        columns: item.columns,
        values: item.values
      })
    }



    this.isLoading = false;
  }

  didLoadImage() {
    var heatmapInstance = h337.create({
      // only container is required, the rest will be defaults
      container: this.map.nativeElement
    });

    var points = [];
    var max = 100;
    var width = this.map.nativeElement.offsetWidth;
    var height = this.map.nativeElement.offsetHeight;
    var len = 100;

    for (let product of this.heatmap) {

      let nsize = 150
      for (let i = 0; i < 30; i++) {
        let noise1 = Math.random() * nsize - nsize / 2
        let noise2 = Math.random() * nsize - nsize / 2

        let val = Math.random() * max;
        var point = {
          x: Math.round(width * product.percentageX + noise1),
          y: Math.round(height * (1 - product.percentageY) + noise2),
          value: Math.round(val)
        }
        points.push(point);
      }
    }


    console.log(points);
    // heatmap data format

    var data = {
      max: max,
      min: 10,
      data: points
    };
    // if you have a set of datapoints always use setData instead of addData
    // for data initialization
    heatmapInstance.setData(data);
  }

  ngAfterViewInit(): void {

  }

  async updateCameraStatus() {
    this.isUpdatingStatus = true
    const updateCameraStatus = this.fns.httpsCallable("updateCameraStatus");
    const results = await updateCameraStatus({
      cameraId: this._id,
      status: !this.cameraStatus
    }).toPromise();

    var sub = undefined;
    var didReachEnd = false;
    var changeCount = 0;

    if (results.status == 200) {
      sub = this.db.collection('cameras').doc(this._id).snapshotChanges().subscribe(val => {
        console.log("doc changes");
        console.log(val.payload.data());
        changeCount += 1;

        if (changeCount >= 3) {
          if (val.payload.data()['last_ping'] >= this.lastPingTime) {
            // success
            this.cameraStatus = val.payload.data()['camera_enabled'];
          } else {
            // camera is offline.
            this.cameraStatus = false;
            this.isCameraOffline = true;
          }

          this.isUpdatingStatus = false
          // disable sub
          if (sub != undefined) {
            sub.unsubscribe();
          }
          didReachEnd = true;
        }

      });
      // timeout 10 seconds
      await sleep(10000);

      if (!didReachEnd) {
        this.cameraStatus = false;
        this.isCameraOffline = true;
        this.isUpdatingStatus = false;
        if (sub != undefined) {
          sub.unsubscribe();
        }
      }
    }

  }
}

async function sleep(millis) {
  return new Promise(resolve => setTimeout(resolve, millis));
}