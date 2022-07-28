import { Component, OnInit } from '@angular/core';
import * as AspNetData from 'devextreme-aspnet-data-nojquery';
import { TransshipmentService } from 'src/app/core/service/transshipment.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  dataSource: any;

  constructor(public transshipmentService: TransshipmentService) {
    this.dataSource = AspNetData.createStore({
      key: 'id',
      loadUrl: 'https://localhost:7273/api/Lead/leads',
    });
  }

  ngOnInit(): void {
    this.transshipmentService.updateMessage("Danh sách khách hàng đặt chỗ");
  }

}
