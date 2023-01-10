import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/common/service/base.service';
import { BlogPost } from '../model/blog-post';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService extends BaseService {

  url = this.domain + "api/BlogPosts"
  constructor(http: HttpClient) {
    super(http);
  }

  create(blogPost: BlogPost): Observable<any>{
    return this.http.post(this.url, blogPost);
  }

  edit(blogPost: BlogPost): Observable<any>{
    return this.http.put(`${this.url}/${blogPost.id}`, blogPost);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.url}/${id}`);
  }
  

  getByBlogDetailIdAndLang(masterId: number, lang: string): Observable<any>{
    return this.http.get(`${this.url}/${masterId}/${lang}`);
  }
}
