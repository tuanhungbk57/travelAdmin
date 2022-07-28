import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceContactRoutingModule } from './service-contact-routing.module';
import { CommunicationComponent } from './communication/communication.component';
import { HomeComponent } from './home/home.component';
import { MyTeamComponent } from './my-team/my-team.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { QuestionComponent } from './question/question.component';
import { WorktimeComponent } from './worktime/worktime.component';
import { HomeService } from './service/home.service';
import { CommunicationService } from './service/communication.service';
import { ContactService } from './service/contact.service';
import { MyTeamService } from './service/my-team.service';
import { NewsletterService } from './service/newsletter.service';
import { QuestionService } from './service/question.service';
import { WorktimeService } from './service/worktime.service';
import { VisaService } from './service/visa.service';
import { SystemModule } from '../system/system.module';
import { DxButtonModule, DxSelectBoxModule, DxPopupModule, DxTemplateModule, DxTextBoxModule, DxScrollViewModule, DxTabPanelModule, DxTextAreaModule } from 'devextreme-angular';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [CommunicationComponent,HomeComponent,MyTeamComponent, NewsletterComponent, QuestionComponent, WorktimeComponent
  ],
  imports: [
    CommonModule,
    ServiceContactRoutingModule,
    HttpClientModule,SharedModule,SystemModule,
    DxTextBoxModule, DxButtonModule,  
    DxTemplateModule,DxTextAreaModule,  DxPopupModule,DxSelectBoxModule,
    DxScrollViewModule,
  ],
  providers:[HomeService, CommunicationService, ContactService, MyTeamService, NewsletterService, QuestionService, WorktimeService, VisaService]
})
export class ServiceContactModule { }
