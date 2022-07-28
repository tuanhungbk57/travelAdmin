import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/common/service/base.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyOverviewService extends BaseService {

  url = this.domain + "api/Companyoverviews"
  constructor( http: HttpClient) {
    super(http);
   }

  update(com: any): Observable<any>{
    return this.http.put(`${this.url}/${com.id}`, com);
  }
  create(com: any): Observable<any>{
    return this.http.post(`${this.url}`, com);
  }

  getInfoByLang(lang: string): Observable<any>{
    return this.http.get(`${this.url}/${lang}`);
  }
}
