import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  private products: Array<Product> = new Array<Product>();
  private isLoading: boolean = true

  constructor(private db: AngularFirestore,
    private auth: AngularFireAuth) { }

  async ngOnInit() {
    // make api request to firebase
    const results = await this.db
      .collection('products')
      .ref
      .where('owner_uid', '==', this.auth.auth.currentUser.uid)
      .get();
    this.isLoading = false;
    //this.spinner.hide()
    for (let doc of results.docs) {
      const data = doc.data();
      console.log(data.created_at)
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
  

}

type Product = {
  name: string,
  id: string,
  image: string | null
  createdAt: Date
}

