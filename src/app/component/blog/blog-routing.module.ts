import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { BlogMasterComponent } from './blog-master/blog-master.component';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { BlogComponent } from './blog/blog.component';
import { GeneralComponent } from './general/general.component';

const routes: Routes = [
  {
    path: "general",
    component: GeneralComponent
  },
  {
    path: "setting",
    component: BlogMasterComponent
  },
  {
    path: 'setting/:path',
    component: BlogComponent
  },
  {
    path: "detail",
    component: BlogDetailComponent
  },
  {
    path: 'detail/:blogpath/:blogdetailpath',
    component: BlogPostComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
