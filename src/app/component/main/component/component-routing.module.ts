import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { CompanyOverviewComponent } from './company-overview/company-overview.component';
import { DestinationInfoComponent } from './destination-info/destination-info.component';
import { DestinationMasterComponent } from './destination-master/destination-master.component';
import { DestinationComponent } from './destination/destination.component';
import { HomePageComponent } from './home-page/home-page.component';
import { TourDetailComponent } from './tour/tour-detail/tour-detail.component';
import { TourComponent } from './tour/tour/tour.component';
import { TripDetailComponent } from './trip-detail/trip-detail.component';
import { TripComponent } from './trip/trip.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'destination',
    component: DestinationMasterComponent
  },
  {
    path: 'destination-info',
    component: DestinationInfoComponent
  },
  {
    path: 'destination/:path',
    component: DestinationComponent
  },
  {
    path: 'trip',
    component: TripComponent
  },
  {
    path: 'trip/:despath/:trippath',
    component: TripDetailComponent
  },
  {
    path: 'tour',
    component: TourComponent
  },
  {
    path: 'tour/:despath/:trippath/:tourpath',
    component: TourDetailComponent
  },
  {
    path:'info',
    component:CompanyInfoComponent
  },
  {
    path:'general',
    component: CompanyOverviewComponent
  },
  {
    path:'setting',
    loadChildren:()=> import('../../../component/system/system.module').then(m => m.SystemModule)
  },
  {
    path:'service-contact',
    loadChildren:()=> import('../../service-contact/service-contact.module').then(m => m.ServiceContactModule)
  },
  {
    path:"customer",
    loadChildren: () => import('../../../component/customer/customer.module').then(m =>m.CustomerModule)
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule { }
