import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireFunctions } from '@angular/fire/functions';

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
    private auth: AngularFireAuth) { }

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