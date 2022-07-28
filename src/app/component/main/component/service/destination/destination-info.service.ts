import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/common/service/base.service';

@Injectable({
  providedIn: 'root'
})
export class DestinationInfoService  extends BaseService {

  url = this.domain + "api/DestinationInfoes"
  constructor( http: HttpClient) {
    super(http);
   }

   update(des: any): Observable<any>{
    return this.http.put(`${this.url}/${des.id}`, des);
  }
  create(des: any): Observable<any>{
    return this.http.post(`${this.url}`, des);
  }

  getInfoByLang(lang: string): Observable<any>{
    return this.http.get(`${this.url}/${lang}`);
  }
}
