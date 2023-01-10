import { Component, OnInit } from '@angular/core';
import { TransshipmentService } from 'src/app/core/service/transshipment.service';
import { BlogGeneral } from '../model/blog-general';
import { BlogGeneralService } from '../service/blog-general.service';

/**
 * Trang chủ của blog
 *
 * @export
 * @class GeneralComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})

export class GeneralComponent implements OnInit {

  blogGeneral: BlogGeneral = new BlogGeneral();
  currentLang: string = this.genService.getCurrentLang()?.key;
  /**
  * Biến ẩn hiện kho ảnh
  *
  * @type {boolean}
  * @memberof GeneralComponent
  */
  isShowImageRepo: boolean = false;
  constructor(public transshipmentService: TransshipmentService, public genService: BlogGeneralService) { }

  ngOnInit(): void {
    this.getInfoByLang(this.currentLang);
    this.transshipmentService.updateMessage("Nội dung trang blog");
  }

  upsertInfo() {
    this.blogGeneral.lang = this.currentLang;
    if (this.blogGeneral.id) {
      this.genService.update(this.blogGeneral).subscribe((data: any) => {
        console.log(data);
        this.genService.showNoti("Cập nhật thành công");
      })
    } else {
      this.genService.create(this.blogGeneral).subscribe((data: any) => {
        console.log(data);
        this.blogGeneral.id = data;
        this.genService.showNoti("Tạo mới thành công");
      })
    }
  }

  getInfoByLang(lang: string) {
    this.genService.getInfoByLang(lang).subscribe((data: any) => {
      if (data) {
        this.blogGeneral = data;
      } else {
        this.blogGeneral = new BlogGeneral();
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
   * @memberof GeneralComponent
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
  * @memberof GeneralComponent
  */
  selectedItem(data: string) {
    this.blogGeneral.imageURL = data;
    this.isShowImageRepo = false;
  }

}
