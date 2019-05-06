import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.scss']
})
export class ItemViewComponent implements OnInit {
    
    @Input() image: string = null
    @Input() title: string = "Title"
    @Input() body: string = "Body"
    @Input() target: string = "/"
    @Input() buttonTitle: string = "View Item"

    constructor() { }

    ngOnInit() {
    }

}
