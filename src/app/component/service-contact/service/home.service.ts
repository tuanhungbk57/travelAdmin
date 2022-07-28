import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/common/service/base.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService extends BaseService {

  url = this.domain + "api/ServiceContacts"
  constructor(http: HttpClient) {
    super(http);
  }

  update(home: any): Observable<any>{
    return this.http.put(`${this.url}/${home.id}`, home);
  }
  create(home: any): Observable<any>{
    return this.http.post(`${this.url}`, home);
  }

  getInfoByLang(lang: string): Observable<any>{
    return this.http.get(`${this.url}/${lang}`);
  }
}
