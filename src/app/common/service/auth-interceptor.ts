import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, tap  } from 'rxjs/operators';
 
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
 
    constructor(private authService: AuthService) {
    }
 
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
        const token: string = localStorage.getItem('token') || "";

        if (token) {
            req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
        }

        // if (!req.headers.has('Content-Type')) {
        //     req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        // }

        // req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
        // let contentType : string = "";
        // if(req.headers.has('Content-Type')){
        //     contentType = req.headers.get("Content-Type");
        // }
        // let requestOption: any = {};
        // requestOption.setHeaders = {
        //     'Content-Type': contentType? contentType: "application/json"
        // }
        // req.clone(requestOption);
        return next.handle(req).pipe(
            tap({
              next: (event) => {
                if (event instanceof HttpResponse) {
                  if(event.status == 401) {
                    alert('Unauthorize access!!!')
                    this.authService.logout();
                  }
                }
                return event;
              },
              error: (error) => {
                if(error.status == 401) {
                  alert('Unauthorize access!!!')
                  this.authService.logout();
                }
                if(error.status == 404) {
                  // alert('Page Not Found!!!')
                }
              }
      
            }
            )
          );
 
        // if (idToken) {
 
        //     if (!this.authService.isLoggedIn()) {
        //         alert('Hết phiên đăng nhập, vui lòng đăng nhập lại');
        //         location.href = '/authorize/login';
        //     }
 
        //     const cloned = req.clone({
        //         headers: req.headers.set('Authorization', 'Bearer ' + idToken)
        //     });
        //     return next.handle(cloned);
        // } else {
        //     return next.handle(req);
        // }
    }
}