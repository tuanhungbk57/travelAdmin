import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/common/service/base.service';
import { Blog } from '../model/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService extends BaseService {

  url = this.domain + "api/Blogs"
  constructor(http: HttpClient) {
    super(http);
  }

  getBlogByMasterAndLang(masterPath: string, lang: string): Observable<any> {
    return this.http.get(`${this.url}/${masterPath}/${lang}`);
  }

  create(blog: Blog): Observable<any> {
    return this.http.post(this.url, blog);
  }

  edit(des: Blog): Observable<any> {
    return this.http.put(`${this.url}/${des.id}`, des);
  }
}
