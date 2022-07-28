import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { AuthGuard } from './core/auth-guard';

const routes: Routes = [
  {
    path:"login",
    component: LoginComponent
  },
  {
    path:'', canActivate: [AuthGuard],
    loadChildren: () => import('./component/main/main.module').then(m =>m.MainModule)
  }
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
