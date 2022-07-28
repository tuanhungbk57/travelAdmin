import { Component, OnInit } from '@angular/core';
import { SidenavService } from 'src/app/core/service/sidenav.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(public sidenavService: SidenavService) { }
  ngOnInit(): void {
  }
  toggleSidebar() {
    this.sidenavService.setSidebarState(!this.sidenavService.getSidebarState());
  }
  toggleBackgroundImage() {
    this.sidenavService.hasBackgroundImage = !this.sidenavService.hasBackgroundImage;
  }
  getSideBarState() {
    return this.sidenavService.getSidebarState();
  }

  hideSidebar() {
    this.sidenavService.setSidebarState(true);
  }
  helloWorld() {
    alert('Hello world!');
}

  

}
