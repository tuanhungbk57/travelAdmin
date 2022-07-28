import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/common/service/base.service';
import * as nth from 'src/app/common/util'
import { FolderImage } from '../model/folder-image';
@Injectable({
  providedIn: 'root'
})
export class ImageService extends BaseService {

  constructor( http: HttpClient) {
    super(http);
   }
  urlUpload = this.domain + `/api/upload/`;
  urlImg = this.domain + `api/FolderImages`;
  
  createDesImg(item: FolderImage): Observable<any>{
    return this.http.post(this.urlUpload, item);
  }

  getImageByDesId(desId: number): Observable<any>{
    return this.http.get(`${this.urlImg}/${desId}`);
  }

  getImageByTripId(desId: number, tripId: number): Observable<any>{
    return this.http.get(`${this.urlImg}/${desId}/${tripId}`)
  }

  getImageByGenId(genId: number): Observable<any>{
    return this.http.get(`${this.urlImg}/${genId}/gen`);
  }
  
}
