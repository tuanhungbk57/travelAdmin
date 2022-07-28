import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/common/service/base.service';
import * as nth from 'src/app/common/util'
import { Folder } from '../model/folder';

@Injectable({
  providedIn: 'root'
})
export class FolderService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  url = this.domain + `api/Folders/`;

  /**
   * Tạo mới folder cho Destination
   *
   * @param {Folder} folder
   * @memberof FolderService
   */
  createDestination(folder: Folder): Observable<any> {
    folder.type = 0;
    folder.id = 0;
    folder.parentId = 0;
    return this.http.post(this.url, folder)
  };


  /**
   * Tạo mới folder cho Trip
   *
   * @param {Folder} folder
   * @returns {Observable<any>}
   * @memberof FolderService
   */
  createTrip(folder: Folder): Observable<any> {
    return this.http.post(this.url, folder);
  };

  /**
  * Tạo mới folder cho General
  *
  * @param {Folder} folder
  * @memberof FolderService
  */
  createGeneral(folder: Folder): Observable<any> {
    folder.type = 2;
    folder.id = 0;
    folder.parentId = 0;
    return this.http.post(this.url, folder)
  };


  /**
   * Lấy về danh sách Des folder
   *
   * @returns {Observable<any>}
   * @memberof FolderService
   */
  getDes(): Observable<any> {
    return this.http.get(`${this.url}des`);
  }

  /**
 * Lấy về danh sách General folder
 *
 * @returns {Observable<any>}
 * @memberof FolderService
 */
  getGen(): Observable<any> {
    return this.http.get(`${this.url}general`);
  }


  /**
   *Lấy về danh sách Trip folder theo Desid
   *
   * @param {number} desId
   * @returns {Observable<any>}
   * @memberof FolderService
   */
  getTrip(desId: number): Observable<any> {
    return this.http.get(`${this.url}${desId}/parent`)
  }

}
