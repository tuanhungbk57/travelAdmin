import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as nth from 'src/app/common/util'

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  progress: number = 1;
  message: string = "";
  url: string = "";
  @Input() type: number = 1;
  @Input() folderId: number = 0;
  @Input() parentId: number = 0;
  /**
   *Loại ảnh upload
   * 0: Destination (default)
   * 1: Trip
   * @memberof UploadComponent
   */
  @Output() public onUploadFinished = new EventEmitter();
  
  constructor(private http: HttpClient) { }
  ngOnInit() {
    
  }
  uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }
    // let fileToUpload = <File>files[0];
    
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      formData.append('file', file, file.name);
      
    }
    let url = "";
    if(this.type ==0 || this.type ==2){
      url = `${nth.urlAPI}api/upload/${this.type}/${this.folderId}`
    }else if(this.type ==1){
      url = `${nth.urlAPI}api/upload/${this.type}/${this.folderId}/${this.parentId}`
    }
    
    this.http.post(url, formData, {reportProgress: true, observe: 'events'})
      .subscribe({
        next: (event) => {
        if (event.type === HttpEventType.UploadProgress){
          if (event.total) this.progress = Math.round(100 * event.loaded / event.total);
        }
          
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
          
        }
        this.onUploadFinished.emit(this.folderId);
      },
      error: (err: HttpErrorResponse) => console.log(err)
    });
  }

}
