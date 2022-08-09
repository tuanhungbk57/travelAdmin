import { Component, OnInit } from '@angular/core';
import { TransshipmentService } from 'src/app/core/service/transshipment.service';
import { Newsletter } from '../model/newsletter';
import { NewsletterService } from '../service/newsletter.service';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit {

  news: Newsletter = new Newsletter();
  currentLang: string = this.newsService.getCurrentLang()?.key;

  /**
* Biến ẩn hiện kho ảnh
*
* @type {boolean}
* @memberof NewsletterComponent
*/
  isShowImageRepo: boolean = false;

  constructor(public newsService: NewsletterService, public transshipmentService: TransshipmentService) { }

  ngOnInit(): void {
    this.getInfoByLang(this.currentLang);
    this.transshipmentService.updateMessage("Thiết lập nội dung trang khách hàng đăng ký nhận bản tin");

  }

  upsertInfo() {
    this.news.lang = this.currentLang;
    if (this.news.id > 0) {
      this.newsService.update(this.news).subscribe((data: any) => {
        console.log(data);
        this.newsService.showNoti("Cập nhật thành công");
      })
    } else {
      this.newsService.create(this.news).subscribe((data: any) => {
        console.log(data);
        this.news.id = data;
        this.newsService.showNoti("Cập nhật thành công");
      })
    }
  }

  getInfoByLang(lang: string) {
    this.newsService.getInfoByLang(lang).subscribe((data: any) => {
      if (data) {
        this.news = data;
      } else {
        this.news = new Newsletter();
      }
    })

  }

  changedLanguage(data: any) {
    this.currentLang = data.key;
    this.getInfoByLang(this.currentLang);
  }

  /**
   * Thực hiện bật repo image
   *
   * @param {string} name
   * @memberof NewsletterComponent
   */
  callRepo() {
    this.isShowImageRepo = true;
  }

  endCallRepo() {
    this.isShowImageRepo = false;

  }

  /**
  * Lắng nghe sự kiện select ảnh từ repo
  *
  * @param {string} data
  * @memberof NewsletterComponent
  */
  selectedItem(data: string) {
    this.news.bannerImage = data;
    this.isShowImageRepo = false;
  }
}
