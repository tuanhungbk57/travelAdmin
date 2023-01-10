import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentRoutingModule } from './component-routing.module';
import { DestinationComponent } from './destination/destination.component';
import { HomePageComponent } from './home-page/home-page.component';
import { TripComponent } from './trip/trip.component';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { DxButtonModule, DxPopupModule, DxScrollViewModule, DxSelectBoxModule,DxCheckBoxModule, DxTabPanelModule, DxTemplateModule, DxTextAreaModule, DxTextBoxModule } from 'devextreme-angular';
import { CompanyInfoService } from './service/company-info.service';
import { CompanyOverviewComponent } from './company-overview/company-overview.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CompanyOverviewService } from './service/company-overview.service';
import { HomeService } from './service/home.service';
import { DestinationMasterComponent } from './destination-master/destination-master.component';
import { DestiantionService } from './service/destination/destiantion.service';
import { DestiantionMasterService } from './service/destination/destiantion-master.service';
import { SystemModule } from '../../system/system.module';
import { TripService } from './service/trip/trip.service';
import { TripDetailComponent } from './trip-detail/trip-detail.component';
import { TripDetailService } from './service/trip/trip-detail.service';
import { TourComponent } from './tour/tour/tour.component';
import { TourDetailComponent } from './tour/tour-detail/tour-detail.component';
import { TourService } from './service/tour/tour.service';
import { TourDetailService } from './service/tour/tour-detail.service';
import { DestinationInfoComponent } from './destination-info/destination-info.component';
import { DestinationInfoService } from './service/destination/destination-info.service';
import { TransshipmentService } from 'src/app/core/service/transshipment.service';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [
    DestinationComponent,
    HomePageComponent,
    TripComponent,
    CompanyInfoComponent,
    CompanyOverviewComponent,
    DestinationMasterComponent,
    TripDetailComponent,
    TourComponent,
    TourDetailComponent,
    DestinationInfoComponent
  ],
  imports: [
    CommonModule,
    ComponentRoutingModule,SharedModule,SystemModule,
    DxTextBoxModule, DxButtonModule,  DxTabPanelModule,
    DxTemplateModule,DxTextAreaModule,  DxPopupModule,DxSelectBoxModule, DxCheckBoxModule,
    DxScrollViewModule, CoreModule,
  ],
  providers:[CompanyInfoService, CompanyOverviewService, TripService, TripDetailService,TourService, TourDetailService,
    HomeService, DestiantionService, DestiantionMasterService, DestinationInfoService]
})
export class ComponentModule { }
