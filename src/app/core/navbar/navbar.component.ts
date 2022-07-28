import { Component, OnInit } from '@angular/core';
import { TransshipmentService } from '../service/transshipment.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  screenText: string = "";
  constructor(private transshipmentService: TransshipmentService) { }

  ngOnInit(): void {
    this.transshipmentService.currentMessage.subscribe(msg => this.screenText = msg);
  }

}
