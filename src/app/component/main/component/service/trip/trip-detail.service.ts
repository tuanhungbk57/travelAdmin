import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/common/service/base.service';
import { TripDetail } from '../../model/trip/trip-detail';

@Injectable({
  providedIn: 'root'
})
export class TripDetailService extends BaseService {

  url = this.domain + "api/Tripdetails"
  constructor(http: HttpClient) {
    super(http);
  }

  create(master: TripDetail): Observable<any>{
    return this.http.post(this.url, master);
  }

  edit(master: TripDetail): Observable<any>{
    return this.http.put(`${this.url}/${master.id}`, master);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.url}/${id}`);
  }
  getAll(): Observable<any>{
    return this.http.get(this.url);
  }

  getByTripMasterIdAndLang(masterId: number, lang: string): Observable<any>{
    return this.http.get(`${this.url}/${masterId}/${lang}`);
  }
}
