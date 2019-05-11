import { Component } from '@angular/core';
import * as _ from "lodash";
import { Upload } from 'src/app/services/upload';
import { UploadFileService } from 'src/app/services/upload-file.service';

@Component({
  selector: 'upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss']
})
export class UploadFormComponent {

  currentUpload: Upload;
  dropzoneActive: boolean = false;

  constructor(private upSvc: UploadFileService) { }

  dropzoneState($event: boolean) {
    this.dropzoneActive = $event;
  }

  handleDrop(fileList: FileList) {

    let filesIndex = _.range(fileList.length)

    _.each(filesIndex, (idx) => {
      this.currentUpload = new Upload(fileList[idx]);
      this.upSvc.pushUpload(this.currentUpload, upload=>{
        
      });
    })
  }

}