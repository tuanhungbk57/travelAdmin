import { Component } from '@angular/core';
import { SidenavService } from './core/service/sidenav.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-pro-sidebar';
  constructor(public sidenavservice: SidenavService) { }
  toggleSidebar() {
    this.sidenavservice.setSidebarState(!this.sidenavservice.getSidebarState());
  }
  toggleBackgroundImage() {
    this.sidenavservice.hasBackgroundImage = !this.sidenavservice.hasBackgroundImage;
  }
  getSideBarState() {
    return this.sidenavservice.getSidebarState();
  }

  hideSidebar() {
    this.sidenavservice.setSidebarState(true);
  }
  helloWorld() {
    alert('Hello world!');
}
}
