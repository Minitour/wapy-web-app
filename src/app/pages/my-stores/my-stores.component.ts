import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
// import { type } from 'os';
import { StoreDetailsComponent } from '../store-details/store-details.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-my-stores',
  templateUrl: './my-stores.component.html',
  styleUrls: ['./my-stores.component.scss']
})
export class MyStoresComponent implements OnInit {

  private stores: Array<Store> = new Array<Store>();
  private isLoading: boolean = true

  constructor(private db: AngularFirestore,
    private auth: AngularFireAuth) { }

  async ngOnInit() {
    // make api request to firebase
    const results = await this.db
      .collection('stores')
      .ref
      .where('owner_uid', '==', this.auth.auth.currentUser.uid)
      .get();
    this.isLoading = false;
    //this.spinner.hide()
    for (let doc of results.docs) {
      const data = doc.data();
      this.stores.push({ id: doc.id, name: data.name, image: data.image })
    }

  }

}

type Store = {
  name: string,
  id: string,
  image: string | null
}