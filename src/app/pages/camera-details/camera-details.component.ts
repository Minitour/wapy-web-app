import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import * as h337 from 'heatmap.js';

@Component({
  selector: 'app-camera-details',
  templateUrl: './camera-details.component.html',
  styleUrls: ['./camera-details.component.scss']
})
export class CameraDetailsComponent implements OnInit, AfterViewInit {



  @ViewChild('map') map: ElementRef;

  private cameraName: string = ""
  private image: string

  private products: Array<any> = []
  private heatmap: Array<any> = []

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

  constructor(private db: AngularFirestore, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  async didSetId() {
    const document = await this.db.collection('cameras').doc(this._id).ref.get();
    if (!document.exists) { return }
    const data = document.data();
    this.cameraName = data.name;
    this.image = data.image;
    this.heatmap = data.heatmap;

    const productIds = data.mmo.objects;
    for (let prod of productIds) {
      let data = await this.db.collection('products').doc(prod.id).ref.get();
      this.products.push(data.data());
      console.log(data.data());
    }
    console.log(data);
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


    // while (len--) {
    //   var val = Math.floor(Math.random() * 100);
    //   max = Math.max(max, val);

    //   var point = {
    //     x: Math.floor(Math.random() * width),
    //     y: Math.floor(Math.random() * height),
    //     value: val
    //   };
    //   points.push(point);
    // }


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

}
