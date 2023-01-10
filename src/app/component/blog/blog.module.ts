import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { GeneralComponent } from './general/general.component';
import { BlogMasterComponent } from './blog-master/blog-master.component';
import { BlogComponent } from './blog/blog.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { DxTextBoxModule, DxButtonModule, DxTabPanelModule, DxTemplateModule, DxTextAreaModule, DxPopupModule, DxSelectBoxModule, DxCheckBoxModule, DxScrollViewModule } from 'devextreme-angular';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SystemModule } from '../system/system.module';


@NgModule({
  declarations: [
    GeneralComponent,
    BlogMasterComponent,
    BlogComponent,
    BlogDetailComponent,
    BlogPostComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    DxTextBoxModule, DxButtonModule,  DxTabPanelModule,
    DxTemplateModule,DxTextAreaModule,  DxPopupModule,DxSelectBoxModule, DxCheckBoxModule,
    DxScrollViewModule, CoreModule,SharedModule,SystemModule
  ]
})
export class BlogModule { }
