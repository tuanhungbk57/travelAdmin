import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SidenavService } from '../../core/service/sidenav.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class SidenavComponent implements OnInit {

  menus: any[] = [];
  constructor(public sidebarservice: SidenavService) {
    this.menus = sidebarservice.getMenuList();
   }
 
  ngOnInit() {
    
  }

  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  toggleSidebar(state: boolean){
     this.sidebarservice.toggled = state;
  }







  toggle(currentMenu: any) {
    if (currentMenu.type === 'dropdown') {
      this.menus.forEach(element => {
        if (element === currentMenu) {
          currentMenu.active = !currentMenu.active;
        } else {
          element.active = false;
        }
      });
    }
  }

  getState(currentMenu: any) {

    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }

  hasBackgroundImage() {
    return this.sidebarservice.hasBackgroundImage;
  }

  logout(){
    localStorage.clear();
  }
}
