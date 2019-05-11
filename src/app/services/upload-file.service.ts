import { Injectable } from '@angular/core';
import { Upload } from './upload';
import * as firebase from 'firebase';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor() { }

  pushUpload(file: File, completion: (upload: Upload) => void) {
    const userId = firebase.auth().currentUser.uid;
    let storageRef = firebase.storage().ref();
    let ext = file.name.split('.').pop();
    let uploadTask = storageRef.child(`${userId}/${uuid.v4()}.${ext}`).put(file);
    const upload = new Upload(file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // upload in progress
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      },
      (error) => {
        // upload failed
        console.log(error)
      },
      () => {
        // upload success
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          upload.url = downloadURL
          upload.name = upload.file.name
          completion(upload)
        });

      }
    );
  }
}
