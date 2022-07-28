import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/common/service/base.service';

@Injectable({
  providedIn: 'root'
})
export class MyTeamService extends BaseService {

  url = this.domain + "api/Teams"
  constructor(http: HttpClient) {
    super(http);
  }

  update(team: any): Observable<any>{
    return this.http.put(`${this.url}/${team.id}`, team);
  }
  create(team: any): Observable<any>{
    return this.http.post(`${this.url}`, team);
  }

  getInfoByLang(lang: string): Observable<any>{
    return this.http.get(`${this.url}/${lang}`);
  }
}
