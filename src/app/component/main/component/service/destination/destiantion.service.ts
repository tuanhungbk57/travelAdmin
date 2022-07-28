import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/common/service/base.service';
import { Destiantion } from '../../model/destination/destiantion';
import { DestiantionMaster } from '../../model/destination/destiantion-master';

@Injectable({
  providedIn: 'root'
})
export class DestiantionService extends BaseService {

  url = this.domain + "api/Destinations"
  constructor(http: HttpClient) {
    super(http);
  }

  getDestinationByMasterAndLang(masterPath: string, lang: string):Observable<any>{
    return this.http.get(`${this.url}/${masterPath}/${lang}`);
  }

  create(destination: Destiantion):Observable<any>{
    return this.http.post(this.url, destination);
  }

  edit(des: Destiantion):Observable<any>{
    return this.http.put(`${this.url}/${des.id}`, des);
  }

  
}
