import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Product } from '../../products/products.component';
import { Upload } from 'src/app/services/upload';

@Component({
  selector: 'app-edit-store-popup',
  templateUrl: './edit-store-popup.component.html',
  styleUrls: ['./edit-store-popup.component.scss']
})
export class EditStorePopupComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<EditStorePopupComponent>,
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
    this.data.newImage = upload.url;
  }

  didRemoveImage() {
    this.data.newImage = undefined;
  }
}
