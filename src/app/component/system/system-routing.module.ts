import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { ImageGeneralComponent } from './image-general/image-general.component';
import { ImageTourComponent } from './image-tour/image-tour.component';
import { ImageTripComponent } from './image-trip/image-trip.component';
import { ImageComponent } from './image/image.component';
import { SystemComponent } from './system.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: '',
    component: ImageComponent
  },
  {
    path: 'image',
    component: ImageComponent
  },
  {
    path: 'image/:id/trip',
    component: ImageTripComponent
  },
  {
    path: 'image/trip',
    component: ImageTripComponent
  },
  {
    path: 'image/general',
    component: ImageGeneralComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'footer',
    component: FooterComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
