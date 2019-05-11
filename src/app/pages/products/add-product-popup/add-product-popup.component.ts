import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Product } from '../products.component';

@Component({
  selector: 'app-add-product-popup',
  templateUrl: './add-product-popup.component.html',
  styleUrls: ['./add-product-popup.component.scss']
})
export class AddProductPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddProductPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
