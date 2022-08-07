import { Component, OnInit } from '@angular/core';
import { TransshipmentService } from 'src/app/core/service/transshipment.service';
import { NewsletterService } from '../../service-contact/service/newsletter.service';
import * as AspNetData from 'devextreme-aspnet-data-nojquery';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {
  dataSource: any;

  constructor(public transshipmentService: TransshipmentService, public newsService: NewsletterService) {
    let url = newsService.domain + "api/Subscribes";
    this.dataSource = AspNetData.createStore({
      key: 'id',
      loadUrl: url,
    });
  }

  ngOnInit(): void {
    this.transshipmentService.updateMessage("Danh sách khách hàng đặt chỗ");
  }

}
