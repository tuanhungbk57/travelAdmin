import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunicationComponent } from './communication/communication.component';
import { HomeComponent } from './home/home.component';
import { MyTeamComponent } from './my-team/my-team.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { QuestionComponent } from './question/question.component';
import { VisaComponent } from './visa/visa.component';
import { WorktimeComponent } from './worktime/worktime.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'communication',
    component: CommunicationComponent
  },
  {
    path: 'newsletter',
    component: NewsletterComponent
  },
  {
    path: 'worktime',
    component: WorktimeComponent
  },
  {
    path: 'my-team',
    component: MyTeamComponent
  },
  {
    path: 'question',
    component: QuestionComponent
  },
  {
    path: 'visa',
    component: VisaComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceContactRoutingModule { }
