import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/common/service/base.service';

@Injectable({
  providedIn: 'root'
})
export class BlogGeneralService  extends BaseService {

  url = this.domain + "api/BlogGenerals"
  constructor( http: HttpClient) {
    super(http);
   }

   update(blogGen: any): Observable<any>{
    return this.http.put(`${this.url}/${blogGen.id}`, blogGen);
  }
  create(blogGen: any): Observable<any>{
    return this.http.post(`${this.url}`, blogGen);
  }

  getInfoByLang(lang: string): Observable<any>{
    return this.http.get(`${this.url}/${lang}`);
  }
}
