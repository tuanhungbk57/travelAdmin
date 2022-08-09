import { Component, OnInit } from '@angular/core';
import * as nth from 'src/app/common/util'
import { TransshipmentService } from 'src/app/core/service/transshipment.service';
import { CountryLang } from 'src/app/shared/model/country-lang';
import { CompanyOverview } from '../model/company-overview';
import { CompanyOverviewService } from '../service/company-overview.service';

@Component({
  selector: 'app-company-overview',
  templateUrl: './company-overview.component.html',
  styleUrls: ['./company-overview.component.scss']
})
export class CompanyOverviewComponent implements OnInit {
  com: CompanyOverview = new CompanyOverview();
  countries: CountryLang[] = nth.langs;
  currentLang: string = this.srv.getCurrentLang()?.key;
  constructor(public srv: CompanyOverviewService, public transshipmentService: TransshipmentService) { }

  /**
 * Biến ẩn hiện kho ảnh
 *
 * @type {boolean}
 * @memberof CompanyOverviewComponent
 */
  isShowImageRepo: boolean = false;
  currentFieldCallRepo: string = "";

  ngOnInit(): void {
    this.getInfoByLang(this.currentLang);
    this.transshipmentService.updateMessage("Thiết lập các thông tin chung của công ty");
  }

  upsertInfo() {
    this.com.lang = this.currentLang;
    if (this.com.id > 0) {
      this.srv.update(this.com).subscribe((data: any) => {
        console.log(data);
        this.srv.showNoti("Cập nhật thành công");
      })
    } else {
      this.srv.create(this.com).subscribe((data: any) => {
        console.log(data);
        this.com.id = data;
        this.srv.showNoti("Cập nhật thành công");
      })
    }
  }

  getInfoByLang(lang: string) {
    this.srv.getInfoByLang(lang).subscribe((data: any) => {
      if (data.length > 0) {
        this.com = data[0];
      } else {
        this.com = new CompanyOverview();
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
  callRepo(name: string) {
    this.isShowImageRepo = true;
    this.currentFieldCallRepo = name;
  }

  endCallRepo(){
    this.isShowImageRepo = false;
    this.currentFieldCallRepo = "";
    
  }

   /**
   * Lắng nghe sự kiện select ảnh từ repo
   *
   * @param {string} data
   * @memberof CompanyOverviewComponent
   */
    selectedItem(data: string){
      (this.com as any)[this.currentFieldCallRepo] = data;
      this.isShowImageRepo = false;
    }

}
