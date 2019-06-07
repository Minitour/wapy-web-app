import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { AngularFireFunctions } from '@angular/fire/functions';
import { MatSnackBar, MatDialog } from '@angular/material';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  isLoading = false;

  displayName: string = "";
  email: string = "";
  profilePictureUrl?: string

  address: string = "";
  city: string = "";
  country: string = "";
  postalCode: number;

  about: string = "";

  storeCount: number = 0;
  cameraCount: number = 0;
  productCount: number = 0;



  constructor(private db: AngularFirestore,
    private auth: AngularFireAuth,
    private fns: AngularFireFunctions,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  async ngOnInit() {
    this.isLoading = true;

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

    const getAccountInfo = this.fns.httpsCallable("getAccountInfo");
    const results = await getAccountInfo({}).toPromise();

    if (results.code != 200) {
      return
    }

    if (results.data) {
      this.address = results.data.address;
      this.city = results.data.city;
      this.country = results.data.country;
      this.postalCode = results.data.postalCode;
      this.about = results.data.about;
    }
    this.isLoading = false;
  }

  async onSubmit() {
    const data = {
      address: this.address,
      city: this.city,
      country: this.country,
      postalCode: this.postalCode,
      about: this.about
    }

    console.log(data);
    const getAccountInfo = this.fns.httpsCallable("updateAccount");
    await getAccountInfo(data).toPromise();

    var user = this.auth.auth.currentUser

    await user.updateProfile({ displayName: this.displayName, photoURL: this.profilePictureUrl });

    this._snackBar.open("Profile Updated");
  }

}

@Component({
  selector: 'app-update-profile-pic',
  template: ''
})
class UpdateProfilePicture implements OnInit {
  ngOnInit(): void {

  }
}
