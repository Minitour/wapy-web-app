import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
import { AngularFireFunctions } from '@angular/fire/functions';
import { Product } from '../products/products.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  productLookupTable: Map<string, Product> = new Map();
  isLoading: boolean = true
  stats: Array<StatData> = []
  graphs: Array<GraphData> = []
  tables: Array<TableData> = []

  constructor(private db: AngularFirestore,
    private auth: AngularFireAuth,
    private fns: AngularFireFunctions,
    private datePipe: DatePipe) { }

  async ngOnInit() {
    await this.loadDashboard(7);
  }

  async loadDashboard(numberOfDays: number) {
    // set loading true
    this.isLoading = true;

    // get products
    const productsData = await this.db
      .collection('products')
      .ref
      .where('owner_uid', '==', this.auth.auth.currentUser.uid)
      .get();

    // update array
    for (let doc of productsData.docs) {
      const data = doc.data();
      this.productLookupTable[doc.id] = {
        id: doc.id,
        name: data.name,
        image: data.image,
        createdAt: data.created_at.toDate()
      };
    }

    const date = new Date();
    const timestamp = this.datePipe.transform(date, "yyyy-MM-dd hh:mm:ss");

    console.log(timestamp)

    // get dashboard data
    const getDashboard = this.fns.httpsCallable("getDashboard");
    const results = await getDashboard({
      numberOfDays: numberOfDays,
      toTime: timestamp
    }).toPromise();

    console.log(results);
    // GET STATS
    const stats = results.data.dashboard.stats;
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
    const graphs = results.data.dashboard.graphs;

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
    const tables = results.data.dashboard.tables;

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
              url : `product/${product.id}`
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

}

type TableData = {
  title: string,
  header: string,
  columns: Array<String>
  values: Array<Array<String>>
}

type StatData = {
  title: string, // The title of the card.
  value: string, // The display value.
  icon: string, // The icon to show.
  iconBgColor: string, // The backgroud color of the icon.
  iconColor: string, // The icon color.
  diffValue: string, // The different value (Like the previous value).
  isPositive: boolean, // Is the current value an improvment over the previous value?
  footerText: string, // Some footer text. (like "Since Yesterday")
  showFooter: boolean // Show footer
}

type GraphData = {
  type: string, // The type of the chart
  data: any // The data
  options: any // The options
  name: string, // The graph name
  header: string // graph header
}
