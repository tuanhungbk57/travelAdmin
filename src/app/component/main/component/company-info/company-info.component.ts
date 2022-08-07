import { Component, OnInit } from '@angular/core';
import { CompanyInfo } from '../model/company-info';
import { CompanyInfoService } from '../service/company-info.service';
import notify from 'devextreme/ui/notify';
import { TransshipmentService } from 'src/app/core/service/transshipment.service';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss']
})
export class CompanyInfoComponent implements OnInit {

  /**
* Biến ẩn hiện kho ảnh
*
* @type {boolean}
* @memberof CompanyInfoComponent
*/
  isShowImageRepo: boolean = false;
  currentFieldCallRepo: string = "";
  constructor(public companyInfoService: CompanyInfoService, public transshipmentService: TransshipmentService) { }
  companyInfo: CompanyInfo = new CompanyInfo();
  ngOnInit(): void {
    this.getInfo();
    this.transshipmentService.updateMessage("Thiết lập thông tin công ty");
  }

  getInfo() {
    this.companyInfoService.getInfo().subscribe((data) => {
      if (data)
        this.companyInfo = data;
    })
  }

  updateInfo() {
    if(this.companyInfo.id){
      this.companyInfoService.update(this.companyInfo).subscribe((data) => {
        console.log(data);
        this.showNoti("Cập nhật thông tin thành công")
      });
    }else{
      this.companyInfoService.create(this.companyInfo).subscribe((data) => {
        console.log(data);
        this.showNoti("Cập nhật thông tin thành công")
      });
    }
    
  }

  showNoti(message: string) {
    let position: object = {
      top: 50,
      bottom: undefined,
      left: undefined,
      right: 50,
    };
    notify({
      message: message,
      height: 45,
      width: 150,
      minWidth: 150,
      type: 'success',
      displayTime: 1000,
      animation: {
        show: {
          type: 'fade', duration: 400, from: 0, to: 1,
        },
        hide: { type: 'fade', duration: 40, to: 0 },
      }

    },
      { position })
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

  endCallRepo() {
    this.isShowImageRepo = false;
    this.currentFieldCallRepo = "";

  }

  /**
  * Lắng nghe sự kiện select ảnh từ repo
  *
  * @param {string} data
  * @memberof CompanyOverviewComponent
  */
  selectedItem(data: string) {
    (this.companyInfo as any)[this.currentFieldCallRepo] = data;
    this.endCallRepo()
  }


}
