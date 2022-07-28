import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/common/service/base.service';
import { TourDetail } from '../../model/tour/tour-detail';

@Injectable({
  providedIn: 'root'
})
export class TourDetailService extends BaseService {

  url = this.domain + "api/Tourdetails"
  constructor(http: HttpClient) {
    super(http);
  }

  create(tourDetail: TourDetail): Observable<any>{
    return this.http.post(this.url, tourDetail);
  }

  edit(tourDetail: TourDetail): Observable<any>{
    return this.http.put(`${this.url}/${tourDetail.id}`, tourDetail);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.url}/${id}`);
  }
  

  getByTourMasterIdAndLang(masterId: number, lang: string): Observable<any>{
    return this.http.get(`${this.url}/${masterId}/${lang}`);
  }
}

