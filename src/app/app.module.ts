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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DxButtonModule,
    BrowserAnimationsModule
  ],
  providers: [AuthGuard,BaseService,TransshipmentService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
