import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { LangComponent } from './lang/lang.component';
import { DxButtonModule, DxSelectBoxModule, DxTemplateModule, DxTextBoxModule } from 'devextreme-angular';
import { ImageCardComponent } from './image-card/image-card.component';




@NgModule({
  declarations: [
   UploadComponent,
   LangComponent,
   ImageCardComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    DxTemplateModule,
    DxButtonModule
  ],
  exports:[
    UploadComponent, LangComponent, ImageCardComponent
  ]
})
export class SharedModule { }
