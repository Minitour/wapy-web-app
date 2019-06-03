import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Upload } from 'src/app/services/upload';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { UploadEvent, UploadFile, FileSystemFileEntry } from 'ngx-file-drop';

@Component({
  selector: 'upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss']
})
export class UploadFormComponent {

  @Output() onUploadCompleted = new EventEmitter<Upload>();
  @Output() onFileRemoved = new EventEmitter<void>();

  @Input() textLabel: string = "Upload Files"

  currentUpload: Upload;
  dropzoneActive: boolean = false;
  public file: UploadFile;
  public image: string;
  public isLoading: boolean = false;
  public showDragAndDropView: boolean = true;
  
  

  constructor(private uploadService: UploadFileService) { }

  public dropped(event: UploadEvent) {
    console.log(event);
    this.file = event.files[0];

    if (this.file.fileEntry.isFile) {
      const fileEntry = this.file.fileEntry as FileSystemFileEntry;
      fileEntry.file((file: File) => {

        // hide drag-drop element
        this.showDragAndDropView = false;
        // show loading indicator
        this.isLoading = true;

        this.uploadService.pushUpload(file,upload=>{
          this.isLoading = false;
          
          console.log(upload);
          // show image
          this.image = upload.url;
          this.onUploadCompleted.emit(upload);
        });

      });
    } else {
      // It was a directory 
      // TODO: show error

    }
  }

  public didRemoveImage(){
    this.file = undefined;
    this.image = undefined;
    this.showDragAndDropView = true;
    this.onFileRemoved.emit();
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }

}