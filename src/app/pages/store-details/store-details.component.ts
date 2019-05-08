import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { checkAndUpdatePureExpressionInline } from '@angular/core/src/view/pure_expression';

@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.scss']
})
export class StoreDetailsComponent implements OnInit,OnDestroy {

  private _id: string;
  private sub: any;
  private storeImage: string = ''
  private storeName: string = 'Loading...'

  get id() {
    return this._id;
  }

  set id(newValue: string) {
    this._id = newValue
    // update layout
    this.didSetId()
    
  }

  constructor(private db: AngularFirestore,private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
   });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  async didSetId() {
    const document = await this.db.collection('stores').doc(this._id).ref.get();
    if (!document.exists) { return }
    const data = document.data();
    this.storeImage = data.image;
    this.storeName = data.name;
  }

}
