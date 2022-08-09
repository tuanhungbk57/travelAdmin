import { Component, OnInit } from '@angular/core';
import { CountryLang } from 'src/app/shared/model/country-lang';
import { Home } from '../model/home';
import { HomeService } from '../service/home.service';
import * as nth from 'src/app/common/util'
import { TransshipmentService } from 'src/app/core/service/transshipment.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  home: Home = new Home();
  countries: CountryLang[] = nth.langs;
  currentLang: string = this.homeService.getCurrentLang()?.key;

  /**
* Biến ẩn hiện kho ảnh
*
* @type {boolean}
* @memberof HomePageComponent
*/
  isShowImageRepo: boolean = false;
  constructor(public homeService: HomeService, public transshipmentService: TransshipmentService) { }

  ngOnInit(): void {
    this.getInfoByLang(this.currentLang);
    this.transshipmentService.updateMessage("Thiết lập trang chủ");
  }

  upsertInfo() {
    this.home.lang = this.currentLang;
    if (this.home.id) {
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
      if (data.length > 0) {
        this.home = data[0];
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
   * @memberof CompanyOverviewComponent
   */
   callRepo() {
    this.isShowImageRepo = true;
  }

  endCallRepo(){
    this.isShowImageRepo = false;
    
  }

   /**
   * Lắng nghe sự kiện select ảnh từ repo
   *
   * @param {string} data
   * @memberof CompanyOverviewComponent
   */
    selectedItem(data: string){
      this.home.imageURL = data;
      this.isShowImageRepo = false;
    }

}
