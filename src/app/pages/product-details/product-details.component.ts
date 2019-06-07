import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { StatData, GraphData, TableData } from '../dashboard/dashboard.component';
import { DatePipe } from '@angular/common';
import { AngularFireFunctions } from '@angular/fire/functions';
import { MatDialog } from '@angular/material';
import { EditProductPopupComponent } from './edit-product-popup/edit-product-popup.component';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {


  private _id: string;
  private sub: any;
  productImage: string = ''
  productName: string | null = null
  errorMessage: string = ''

  isLoading: boolean = true
  stats: Array<StatData> = []
  graphs: Array<GraphData> = []
  tables: Array<TableData> = []

  get id() {
    return this._id;
  }

  set id(newValue: string) {
    this._id = newValue
    // update layout
    this.didSetId()

  }

  constructor(private db: AngularFirestore, private route: ActivatedRoute,
    private datePipe: DatePipe,private router: Router,
    private fns: AngularFireFunctions, public dialog: MatDialog) { }

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
    const document = await this.db.collection('products').doc(this._id).ref.get();
    if (!document.exists) { return }
    const data = document.data();
    this.productImage = data.image;
    this.productName = data.name;

    const date = new Date();
    const timestamp = this.datePipe.transform(date, "yyyy-MM-dd hh:mm:ss");

    console.log(timestamp)

    // get dashboard data
    const getDashboard = this.fns.httpsCallable("getProductDashboard");
    const results = await getDashboard({
      numberOfDays: 7,
      toTime: timestamp,
      productId: this._id
    }).toPromise();

    console.log(results);

    if (results.code != 200) {
      this.isLoading = false
      this.errorMessage = results.message
      return
    }

    // GET STATS
    const stats = results.data.product.stats;
    for (let item of stats) {
      const productId = item.productId;
      var alteredTitle = item.title;
      if (productId) {
        const product = data;
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
    const graphs = results.data.product.graphs;

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
    const tables = results.data.product.tables;

    // for each table
    for (let item of tables) {
      let values = item.values;

      // for each row
      for (let i = 0; i < values.length; i++) {
        // for each column
        for (let j = 0; j < values[i].length; j++) {
          // get product id
          let productId = values[i][j];
          let product = data;

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

  openDialog() {
    const dialogRef = this.dialog.open(EditProductPopupComponent, {
      width: '300px',
      data: {
        image: this.productImage,
        name: this.productName,
      }
    });

    dialogRef.afterClosed().subscribe(async val => {
      if (val) {
        if (val.action != undefined) {
          if (val.action == 0) {
            // delete product
            console.log("delete product")
            const result = await this.fns.httpsCallable("deleteResource")({
              from: 'products',
              id: this._id
            }).toPromise();

            console.log(result)
            if (result['status'] == 200) {
              this.router.navigate(['/products']);
            } else {
              // show error
            }
          }
        } else {
          // update product
          try {
            const data = {
              productId: this._id,
              name: val.name
            }
            if (val.newImage) {
              data['image'] = val.newImage;
            }
            const result = await this.fns.httpsCallable("updateProduct")(data).toPromise();
            console.log(result);
          } catch (e) {
            console.log(e);
          }
        }
      }
    });
  }

}
