import { Component, OnInit } from '@angular/core';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;

  constructor() { }

  ngOnInit() {

    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];


    // var chartOrders = document.getElementById('chart-orders');

    // parseOptions(Chart, chartOptions());


    // var ordersChart = new Chart(chartOrders, {
    //   type: 'bar',
    //   options: chartExample2.options,
    //   data: chartExample2.data
    // });

    // var chartSales = document.getElementById('chart-sales');

    // this.salesChart = new Chart(chartSales, {
		// 	type: 'line',
		// 	options: chartExample1.options,
		// 	data: chartExample1.data
		// });
  }

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

}

/**
 * @Input() title: string = 'Title'
  @Input() value: string = 'Value'
  @Input() icon: string = 'eye'
  @Input() iconBgColor: string = 'danger'
  @Input() iconColor: string = 'white'
  @Input() diffValue: string = '3.56%'
  @Input() isPositive: boolean = true
  @Input() footerText: string = 'Since yesterday'
  @Input() showFooter: boolean = true
 */
type StatData = {
  title: string, // The title of the card.
  value: string, // The display value.
  icon: string, // The icon to show.
  iconBgColor: string, // The backgroud color of the icon.
  iconColor: string, // The icon color.
  diffValue: string, // The different value (Like the previous value).
  isPositive: boolean, // Is the current value an improvment over the previous value?
  footerText: string, // Some footer text. (like "Since Yesterday")
  showFooter: boolean // Show footer?
}

type GraphData = {
  barChartLabels: Array<string>,
  barChartType: string,
  barChartLegend: boolean,
  barChartData: Array<any>
  name: string,
  header: string
}
