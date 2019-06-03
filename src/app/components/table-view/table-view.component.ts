import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit {

  @Input() public header: string = "Header"
  @Input() public title: string = "Table Title"
  @Input() public headers: Array<String> = ["col1","col2","col3"]
  @Input() public data: Array<Array<String | CallableObj>> = [
    ["ro1","ro1","ro1"],
    ["ro1","ro1","ro1"],
    ["ro1","ro1","ro1"],
    ["ro1","ro1","ro1"]
  ]

  constructor() { }

  ngOnInit() {
  }
}

interface CallableObj {
  
  readonly linkable: boolean;

  readonly url: string;

  value: string;
}
