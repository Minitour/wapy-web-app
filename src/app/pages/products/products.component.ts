import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddProductPopupComponent } from './add-product-popup/add-product-popup.component';
import { FirebaseFunctions} from '@angular/fire';
import { AngularFireFunctions } from '@angular/fire/functions';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  private products: Array<Product> = new Array<Product>();
  private isLoading: boolean = true

  constructor(private db: AngularFirestore,
    private auth: AngularFireAuth,
    private fns: AngularFireFunctions,
    public dialog: MatDialog) {
  }


  ngOnInit() {
    // make api request to firebase
    this.loadData();
  }

  async loadData() {

    // reset array
    this.products = new Array<Product>();

    // make API call
    this.isLoading = true

    const results = await this.db
      .collection('products')
      .ref
      .where('owner_uid', '==', this.auth.auth.currentUser.uid)
      .get();

    this.isLoading = false;

    // update array
    for (let doc of results.docs) {
      const data = doc.data();
      this.products.push({
        id: doc.id,
        name: data.name,
        image: data.image,
        createdAt: data.created_at.toDate()
      })
    }
  }

  formatDate(date: Date) {
    const monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }


  openDialog() {
    const dialogRef = this.dialog.open(AddProductPopupComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(async product => {
      console.log('The dialog was closed');
      console.log(product)
      try {
        const result = await this.fns.httpsCallable("createProduct")(product);
        console.log(result);
        this.loadData();
      }catch(e) {
        console.log(e);
      }
    });
  }


}

export interface DialogData {
  animal: string;
  name: string;
}

export type Product = {
  name: string,
  id: string,
  image: string | null
  createdAt: Date
}

