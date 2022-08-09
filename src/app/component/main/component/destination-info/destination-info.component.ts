import { Component, OnInit } from '@angular/core';
import { TransshipmentService } from 'src/app/core/service/transshipment.service';
import { DestinationInfo } from '../model/destination/destination-info';
import { DestinationInfoService } from '../service/destination/destination-info.service';

@Component({
  selector: 'app-destination-info',
  templateUrl: './destination-info.component.html',
  styleUrls: ['./destination-info.component.scss']
})
export class DestinationInfoComponent implements OnInit {

  desInfo: DestinationInfo = new DestinationInfo();
  currentLang: string = this.desInfoService.getCurrentLang()?.key;

  /**
* Biến ẩn hiện kho ảnh
*
* @type {boolean}
* @memberof DestinationInfoComponent
*/
  isShowImageRepo: boolean = false;

  constructor(public desInfoService: DestinationInfoService, public transshipmentService: TransshipmentService) { }

  ngOnInit(): void {
    this.getInfoByLang(this.currentLang);
    this.transshipmentService.updateMessage("Nội dung giới thiệu các điểm đến");
  }

  upsertInfo() {
    this.desInfo.lang = this.currentLang;
    if (this.desInfo.id) {
      this.desInfoService.update(this.desInfo).subscribe((data: any) => {
        console.log(data);
        this.desInfoService.showNoti("Cập nhật thành công");
      })
    } else {
      this.desInfoService.create(this.desInfo).subscribe((data: any) => {
        console.log(data);
        this.desInfo.id = data;
        this.desInfoService.showNoti("Tạo mới thành công");
      })
    }
  }

  getInfoByLang(lang: string) {
    this.desInfoService.getInfoByLang(lang).subscribe((data: any) => {
      if (data) {
        this.desInfo = data;
      } else {
        this.desInfo = new DestinationInfo();
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
   * @memberof DestinationInfoComponent
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
   * @memberof DestinationInfoComponent
   */
    selectedItem(data: string){
      this.desInfo.imageURL = data;
      this.isShowImageRepo = false;
    }


}
