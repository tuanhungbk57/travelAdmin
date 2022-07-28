import { NgModule } from '@angular/core';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact/contact.component';


@NgModule({
  declarations: [
    MainComponent,
    ContactComponent
  ],
  imports: [
    MainRoutingModule,
    CommonModule,
    CoreModule
  ],
  exports:[MainComponent]
})
export class MainModule { }
