import { Component, OnInit } from '@angular/core';
import * as AspNetData from 'devextreme-aspnet-data-nojquery';
import { TransshipmentService } from 'src/app/core/service/transshipment.service';
import { NewsletterService } from '../../service-contact/service/newsletter.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  dataSource: any;

  constructor(public transshipmentService: TransshipmentService, public newsService: NewsletterService) {
    let url = newsService.domain + "api/Lead/leads";
    this.dataSource = AspNetData.createStore({
      key: 'id',
      loadUrl: url,
    });
  }

  ngOnInit(): void {
    this.transshipmentService.updateMessage("Danh sách khách hàng đặt chỗ");
  }

}
