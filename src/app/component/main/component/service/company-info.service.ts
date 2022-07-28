import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/common/service/base.service';
import { CompanyInfo } from '../model/company-info';

/**
 * service thiết lập thông tin công ty
 *
 * @export
 * @class CompanyInfoService
 * @extends {BaseService}
 */
@Injectable({
  providedIn: 'root'
})
export class CompanyInfoService extends BaseService{

  constructor( http: HttpClient) { 
    super(http);
  }
  url = `${this.domain}api/Companyinfoes`


  /**
   * tạo thông tin công ty
   *
   * @param {CompanyInfo} c
   * @returns {Observable<any>}
   * @memberof CompanyInfoService
   */
  create(c: CompanyInfo): Observable<any>{
    return this.http.post(this.url, c);
  }


  /**
   * Lấy thông tin công ty
   *
   * @returns {Observable<any>}
   * @memberof CompanyInfoService
   */
  getInfo(): Observable<any>{
    return this.http.get(this.url);
  }

  update(c: CompanyInfo): Observable<any>{
    return this.http.put(`${this.url}/${c.id}`, c);
  }


}
