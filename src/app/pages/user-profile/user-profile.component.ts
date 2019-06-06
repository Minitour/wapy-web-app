import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  displayName: string = "";
  email: string = "";
  profilePictureUrl: string = ""

  address: string = "";
  city: string = "";
  country: string = "";
  postalCode: number;

  about: string = "";

  storeCount: number = 0;
  cameraCount: number = 0;
  productCount: number = 0;



  constructor(private db: AngularFirestore,
    private auth: AngularFireAuth) { }

  async ngOnInit() {
    var subscription: Subscription = undefined

    // create subscription
    subscription = this.auth.authState.subscribe(user => {
      if (user) {
        if (user.displayName) {
          this.displayName = user.displayName;
        }

        this.email = user.email;

        if (user.photoURL) {
          this.profilePictureUrl = user.photoURL;
        }

        if (subscription) {
          subscription.unsubscribe();
        }
      }
    })

    this.productCount = (await this.db
      .collection('products')
      .ref
      .where('owner_uid', '==', this.auth.auth.currentUser.uid)
      .get()).docs.length;

    this.cameraCount = (await this.db
      .collection('cameras')
      .ref
      .where('owner_uid', '==', this.auth.auth.currentUser.uid)
      .get()).docs.length;

    this.storeCount = (await this.db
      .collection('stores')
      .ref
      .where('owner_uid', '==', this.auth.auth.currentUser.uid)
      .get()).docs.length;
  }

}
