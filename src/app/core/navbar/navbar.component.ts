import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/common/service/auth.service';
import { TransshipmentService } from '../service/transshipment.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  screenText: string = "";
  constructor(private transshipmentService: TransshipmentService, public authService: AuthService) { }

  ngOnInit(): void {
    this.transshipmentService.currentMessage.subscribe(msg => this.screenText = msg);
  }
  logout(){
    this.authService.logout();
  }

}
