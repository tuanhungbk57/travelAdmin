import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/common/service/base.service';
import { Trip } from '../../model/trip/trip';

@Injectable({
  providedIn: 'root'
})
export class TripService extends BaseService {

  url = this.domain + "api/Trips"
  constructor(http: HttpClient) {
    super(http);
  }

  createMaster(master: Trip): Observable<any>{
    return this.http.post(this.url, master);
  }

  editMaster(master: Trip): Observable<any>{
    return this.http.put(`${this.url}/${master.id}`, master);
  }

  deleteMaster(id: number): Observable<any>{
    return this.http.delete(`${this.url}/${id}`);
  }
  getAll(): Observable<any>{
    return this.http.get(this.url);
  }

  getByDesURL(path: string): Observable<any>{
    return this.http.get(`${this.url}/${path}/des`);
  }
  getTripByDesAndFullTrip(des: string, trip: string): Observable<any>{
    return this.http.get(`${this.url}/${des}/${trip}`);
  }

}
