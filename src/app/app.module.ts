import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DxButtonModule } from 'devextreme-angular';
import { LoginComponent } from './component/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BaseService } from './common/service/base.service';
import { TransshipmentService } from './core/service/transshipment.service';
import { AuthGuard } from './core/auth-guard';
import { AuthService } from './common/service/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './common/service/auth-interceptor';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DxButtonModule,
    BrowserAnimationsModule,
    FormsModule, HttpClientModule
  ],
  providers: [AuthGuard,BaseService,TransshipmentService, AuthService,
    {
      provide: HTTP_INTERCEPTORS, //import { HTTP_INTERCEPTORS } from '@angular/common/http';
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
