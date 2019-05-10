import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  private _id: string;
  private sub: any;
  private productImage: string = ''
  private productName: string = 'Loading...'
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
    const document = await this.db.collection('products').doc(this._id).ref.get();
    if (!document.exists) { return }
    const data = document.data();
    this.productImage = data.image;
    this.productName = data.name;
  }

}
