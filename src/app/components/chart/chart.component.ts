import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  @Input() header: string = 'Reactions'
  @Input() title: string = 'Overall reactions on products'

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  @Input() public labels = ["Calm", "Happy", "Confused", "Disgusted", "Angry", "Sad"];
  @Input() public type = 'bar';
  @Input() public datasets = [{ data: [65, 59, 80, 81, 56, 55, 40] }];
  @Input() public options: any = {
    responsive: true,
    maintainAspectRatio: false
  };
  


  constructor() {
  }

  ngOnInit() {
  }

}
