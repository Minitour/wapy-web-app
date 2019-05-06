import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.scss']
})
export class StoreDetailsComponent implements OnInit,OnDestroy {

  private _id: string;
  private sub: any;

  get id() {
    return this._id;
  }

  set id(newValue: string) {
    this._id = newValue
    // update layout
  }

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
   });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
