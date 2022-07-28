import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/common/service/base.service';
import { Tour } from '../../model/tour/tour';

@Injectable({
  providedIn: 'root'
})
export class TourService extends BaseService {

  url = this.domain + "api/Tours"
  constructor(http: HttpClient) {
    super(http);
  }

  create(tour: Tour): Observable<any>{
    return this.http.post(this.url, tour);
  }

  edit(tour: Tour): Observable<any>{
    return this.http.put(`${this.url}/${tour.id}`, tour);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.url}/${id}`);
  }
  getAll(): Observable<any>{
    return this.http.get(this.url);
  }

  getByDesTrip(desPath: string, tripPath: string): Observable<any>{
    return this.http.get(`${this.url}/${desPath}/${tripPath}`);
  }
  getTourByTripMaster(tripId: number):Observable<any>{
    return this.http.get(`${this.url}/${tripId}/trip-master`)
  }
  getTourByTourPath(des: string, trip: string,tourPath: string):Observable<any>{
    return this.http.get(`${this.url}/${des}/${trip}/${tourPath}`);
  }
}
