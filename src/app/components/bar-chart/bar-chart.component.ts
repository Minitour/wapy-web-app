import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class ChartComponent implements OnInit {

  @Input() header: string = 'Reactions'
  @Input() title: string = 'Overall reactions on products'

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  @Input() public barChartLabels = ["Calm", "Happy", "Confused", "Disgusted", "Angry", "Sad"];
  @Input() public barChartType = 'bar';
  @Input() public barChartLegend = false;
  @Input() public barChartData = [{ data: [65, 59, 80, 81, 56, 55, 40] }];
  @Input() public lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false
  };


  constructor() {
  }

  ngOnInit() {
  }

}
