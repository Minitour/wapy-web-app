import { Component, OnInit, Input } from '@angular/core';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  
  @Input() header: string = 'Reactions'
  @Input() title: string = 'Overall reactions on products'

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = ["Calm", "Happy", "Confused", "Disgusted", "Angry", "Sad"];
  public barChartType = 'bar';
  public barChartLegend = false;
  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'}
  ];


  constructor() { }

  ngOnInit() {
  }

}
