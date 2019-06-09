import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireFunctions } from '@angular/fire/functions';
import { MatSnackBar, MatDialog } from '@angular/material';
import { EditStorePopupComponent } from './edit-store-popup/edit-store-popup.component';
import { delay } from 'q';

@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.scss']
})
export class StoreDetailsComponent implements OnInit, OnDestroy {

  private _id: string;
  private sub: any;
  storeImage: string = ''
  storeName: string = 'Loading...'
  isLoading: boolean = true

  cameras: Array<Camera> = new Array<Camera>();

  get id() {
    return this._id;
  }

  set id(newValue: string) {
    this._id = newValue
    // update layout
    this.didSetId()

  }

  constructor(private db: AngularFirestore,
    private fns: AngularFireFunctions,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AngularFireAuth,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

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
    console.log(this._id);
    const getCameras = this.fns.httpsCallable("getCameras");
    const results = await getCameras({ storeId: this._id }).toPromise();
    const cameras = results.data;

    this.isLoading = false;

    for (let camera of cameras) {
      this.cameras.push({
        id: camera.id,
        name: camera.name,
        image: camera.image,
        heatmap: camera.heatmap,
        version: camera.version
      })
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(EditStorePopupComponent, {
      width: '300px',
      data: {
        image: this.storeImage,
        name: this.storeName,
      }
    });

    dialogRef.afterClosed().subscribe(async val => {
      if (val) {
        if (val.action == undefined) {
          // update product
          try {
            const data = {
              storeId: this._id,
              name: val.name
            }

            if (val.newImage) {
              data['image'] = val.newImage;
            }
            const result = await this.fns.httpsCallable("updateStore")(data).toPromise();
            console.log(result);

            this.storeName = data.name;

            if (data['image']) {
              this.storeImage = data['image'];
            }

            this.snackBar.open('Product Updated', null, { duration: 1000 })

          } catch (e) {
            console.log(e);
            this.snackBar.open('Something went wrong...',null,{ duration: 1000 })
          }
        }
      }
    });
  }
}

type Camera = {
  id: string,
  heatmap: Array<HeatmapElement>,
  image: string,
  name: string,
  version: string
}

type HeatmapElement = {
  id: string,
  percentageX: number,
  percentageY: number
}