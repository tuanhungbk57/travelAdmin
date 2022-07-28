import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemRoutingModule } from './system-routing.module';
import { SystemComponent } from './system.component';
import { UserComponent } from './user/user.component';
import { ImageComponent } from './image/image.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ImageTripComponent } from './image-trip/image-trip.component';
import { DxPopupModule, DxButtonModule, DxTemplateModule, DxSelectBoxModule, DxTextBoxModule } from 'devextreme-angular';
import { FolderService } from './service/folder.service';
import { FolerPopupComponent } from './popup/foler-popup/foler-popup.component';
import { ImageService } from './service/image.service';
import { ImageTourComponent } from './image-tour/image-tour.component';
import { ImageGeneralComponent } from './image-general/image-general.component';


@NgModule({
  declarations: [
    SystemComponent,
    UserComponent,
    ImageComponent,
    ImageTripComponent,
    FolerPopupComponent,
    ImageTourComponent,
    ImageGeneralComponent
  ],
  imports: [
    CommonModule,
    SystemRoutingModule,
    SharedModule,
    DxButtonModule,
    DxSelectBoxModule,DxPopupModule,DxTemplateModule,DxTextBoxModule
  ],
  providers:[FolderService, ImageService],
  exports:[ImageComponent, ImageTripComponent, ImageTourComponent, ImageGeneralComponent]
})
export class SystemModule { }
