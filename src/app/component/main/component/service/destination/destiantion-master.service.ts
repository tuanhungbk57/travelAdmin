import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/common/service/base.service';
import { DestiantionMaster } from '../../model/destination/destiantion-master';

@Injectable({
  providedIn: 'root'
})
export class DestiantionMasterService extends BaseService {

  url = this.domain + "api/DestinationMasters"
  constructor(http: HttpClient) {
    super(http);
  }

  createMaster(master: DestiantionMaster): Observable<any>{
    return this.http.post(this.url, master);
  }

  editMaster(master: DestiantionMaster): Observable<any>{
    return this.http.put(`${this.url}/${master.id}`, master);
  }

  deleteMaster(id: number): Observable<any>{
    return this.http.delete(`${this.url}/${id}`);
  }
  getAll(): Observable<any>{
    return this.http.get(this.url);
  }
}
