import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.scss']
})
export class ItemViewComponent implements OnInit {
    
    @Input() image: string = null
    @Input() title: string = "Title"
    @Input() body: string = "Body"
    @Input() target: Array<string> = ['/']
    @Input() buttonTitle: string = "View Item"

    constructor(private router: Router) { }

    ngOnInit() {
    }

    async didSelectButton() {
      await this.router.navigate(this.target);
    }
}
