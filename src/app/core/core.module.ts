import { NgModule } from '@angular/core';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SidenavService } from './service/sidenav.service';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { TransshipmentService } from './service/transshipment.service';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
    
    declarations: [SidenavComponent, NavbarComponent],
  imports: [
    PerfectScrollbarModule, RouterModule,
  ],
  providers:[SidenavService,{
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  }],
  exports:[SidenavComponent, NavbarComponent]
})
export class CoreModule { }
