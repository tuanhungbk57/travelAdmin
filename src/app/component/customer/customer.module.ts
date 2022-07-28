import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { ContactComponent } from './contact/contact.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { DxDataGridModule } from 'devextreme-angular';


@NgModule({
  declarations: [
    ContactComponent,
    SubscribeComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    DxDataGridModule
  ]
})
export class CustomerModule { }
