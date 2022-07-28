import { Component, OnInit } from '@angular/core';
import { TransshipmentService } from 'src/app/core/service/transshipment.service';
import { Communication } from '../model/communication';
import { CommunicationService } from '../service/communication.service';

@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.scss']
})
export class CommunicationComponent implements OnInit {
  com: Communication = new Communication();
  currentLang: string = this.comService.getCurrentLang()?.key;

  /**
* Biến ẩn hiện kho ảnh
*
* @type {boolean}
* @memberof HomeComponent
*/
  isShowImageRepo: boolean = false;

  constructor(public comService: CommunicationService, public transshipmentService: TransshipmentService) { }

  ngOnInit(): void {
    this.getInfoByLang(this.currentLang);
    this.transshipmentService.updateMessage("Thiết lập nội dung trang khách hàng đăng ký du lịch");
  }

  upsertInfo() {
    this.com.lang = this.currentLang;
    if (this.com.id > 0) {
      this.comService.update(this.com).subscribe((data: any) => {
        console.log(data);
        this.com.id = data;
        this.comService.showNoti("Cập nhật thành công");
      })
    } else {
      this.comService.create(this.com).subscribe((data: any) => {
        console.log(data);
        this.comService.showNoti("Cập nhật thành công");
      })
    }
  }

  getInfoByLang(lang: string) {
    this.comService.getInfoByLang(lang).subscribe((data: any) => {
      if (data) {
        this.com = data;
      } else {
        this.com = new Communication();
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
   * @memberof HomeComponent
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
  * @memberof HomeComponent
  */
  selectedItem(data: string) {
    this.com.bannerImage = data;
    this.isShowImageRepo = false;
  }

}
