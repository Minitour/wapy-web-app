import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss']
})
export class CardViewComponent implements OnInit {

  @Input() title: string = 'Title'
  @Input() value: string = 'Value'
  @Input() icon: string = 'eye'
  @Input() iconBgColor: string = 'danger'
  @Input() iconColor: string = 'white'
  @Input() diffValue: string = '3.56%'
  @Input() isPositive: boolean = true
  @Input() footerText: string = 'Since yesterday'
  @Input() showFooter: boolean = true
  
  constructor() { }

  ngOnInit() {
  }

}
