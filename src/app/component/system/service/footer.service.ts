import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/common/service/base.service';
import { Footer } from '../model/footer';

@Injectable({
  providedIn: 'root'
})
export class FooterService extends BaseService {

  url = this.domain + "api/footers"
  constructor(http: HttpClient) {
    super(http);
  }

  create(footer: Footer): Observable<any>{
    return this.http.post(this.url, footer);
  }

  edit(footer: Footer): Observable<any>{
    return this.http.put(`${this.url}/${footer.id}`, footer);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.url}/${id}`);
  }
  

  getByFooterByLang( lang: string): Observable<any>{
    return this.http.get(`${this.url}/${lang}`);
  }
}
