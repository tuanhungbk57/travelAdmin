import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/common/service/base.service';
import { BlogDetail } from '../model/blog-detail';

@Injectable({
  providedIn: 'root'
})
export class BlogDetailService extends BaseService {

  url = this.domain + "api/BlogDetails"
  constructor(http: HttpClient) {
    super(http);
  }
  createMaster(master: BlogDetail): Observable<any> {
    return this.http.post(this.url, master);
  }

  editMaster(master: BlogDetail): Observable<any> {
    return this.http.put(`${this.url}/${master.id}`, master);
  }

  deleteMaster(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
  getAll(): Observable<any> {
    return this.http.get(this.url);
  }

  getByBlogURL(path: string): Observable<any> {
    return this.http.get(`${this.url}/${path}/blog`);
  }
  
  getBlogDetailByBlogDetailPath(blogPath: string, blogDetailPath: string):Observable<any>{
    return this.http.get(`${this.url}/${blogPath}/${blogDetailPath}`);
  }

}
