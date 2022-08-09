import { Component, OnInit } from '@angular/core';
import { TransshipmentService } from 'src/app/core/service/transshipment.service';
import { Home } from '../model/home';
import { HomeService } from '../service/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  home: Home = new Home();
  currentLang: string = this.homeService.getCurrentLang()?.key;

  /**
* Biến ẩn hiện kho ảnh
*
* @type {boolean}
* @memberof HomeComponent
*/
  isShowImageRepo: boolean = false;
  currentFieldCallRepo: string = "";
  constructor(public homeService: HomeService, public transshipmentService: TransshipmentService) { }

  ngOnInit(): void {
    this.getInfoByLang(this.currentLang);
    this.transshipmentService.updateMessage("Thiết lập nội dung trang giới thiệu dịch vụ");
  }

  upsertInfo() {
    this.home.lang = this.currentLang;
    if (this.home.id > 0) {
      this.homeService.update(this.home).subscribe((data: any) => {
        console.log(data);
        this.homeService.showNoti("Cập nhật thành công");
      })
    } else {
      this.homeService.create(this.home).subscribe((data: any) => {
        console.log(data);
        this.home.id = data;
        this.homeService.showNoti("Cập nhật thành công");
      })
    }
  }

  getInfoByLang(lang: string) {
    this.homeService.getInfoByLang(lang).subscribe((data: any) => {
      if (data) {
        this.home = data;
      } else {
        this.home = new Home();
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
  callRepo(name: string) {
    this.isShowImageRepo = true;
    this.currentFieldCallRepo = name;
  }

  endCallRepo() {
    this.isShowImageRepo = false;
    this.currentFieldCallRepo = "";

  }

  /**
  * Lắng nghe sự kiện select ảnh từ repo
  *
  * @param {string} data
  * @memberof HomeComponent
  */
  selectedItem(data: string) {
    (this.home as any)[this.currentFieldCallRepo] = data;
    this.isShowImageRepo = false;
  }

}
