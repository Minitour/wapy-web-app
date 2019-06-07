import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Product } from '../../products/products.component';
import { Upload } from 'src/app/services/upload';

@Component({
  selector: 'app-edit-product-popup',
  templateUrl: './edit-product-popup.component.html',
  styleUrls: ['./edit-product-popup.component.scss']
})
export class EditProductPopupComponent implements OnInit {

  newImage: string = ''

  constructor(
    public dialogRef: MatDialogRef<EditProductPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onNoClick(res): void {
    this.dialogRef.close({ action: res });
  }

  onCreateClick() {
    // gather data
    // send to completion
  }

  didComplete(upload: Upload) {
    console.log(upload.url);
    this.newImage = upload.url;
  }

  didRemoveImage() {
    this.newImage = null;
  }
}
