import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  url = this.domain + "api/Authenticate/login"
  constructor(http: HttpClient, public router: Router) {
    super(http);
  }

  login(body: any): Observable<any>{
    return this.http.post(this.url, body);
  }
  logout(){
    localStorage.removeItem("token");
    this.router.navigate(['/login'])
  }

}
