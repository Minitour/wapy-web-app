import { Component, Output, EventEmitter, Input, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Upload } from 'src/app/services/upload';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { UploadEvent, UploadFile, FileSystemFileEntry } from 'ngx-file-drop';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss']
})
export class UploadFormComponent implements OnInit {


  @Output() onUploadCompleted = new EventEmitter<Upload>();
  @Output() onFileRemoved = new EventEmitter<void>();
  @Input() textLabel: string = "Upload Files"
  @ViewChild('fileInput') fileInput: ElementRef;

  currentUpload: Upload;
  dropzoneActive: boolean = false;
  public file: UploadFile;
  public image: string;
  public isLoading: boolean = false;
  public showDragAndDropView: boolean = true;

  public uploader: FileUploader = new FileUploader({});

  constructor(private uploadService: UploadFileService) { }


  ngOnInit(): void {
  }

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

        this.uploadService.pushUpload(file, upload => {
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

  public didRemoveImage() {
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



  public openFileDialog(): void {
    let event = new MouseEvent('click', { bubbles: false });
    this.fileInput.nativeElement.dispatchEvent(event);
  }

  public didSelectFile(items: FileList) {
    if (items.length == 0 || items.length > 1) {
      return
    }
    const file = items[0]
    this.showDragAndDropView = false;
    this.isLoading = true;

    this.uploadService.pushUpload(file, upload => {
      this.isLoading = false;

      console.log(upload);
      // show image
      this.image = upload.url;
      this.onUploadCompleted.emit(upload);
    });

    this.fileInput.nativeElement.value = "";
  }

}