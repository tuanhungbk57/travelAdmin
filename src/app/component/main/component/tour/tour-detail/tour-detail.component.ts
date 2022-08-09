import { Component, OnInit } from '@angular/core';
import { TransshipmentService } from 'src/app/core/service/transshipment.service';
import { CountryLang } from 'src/app/shared/model/country-lang';
import { Tour } from '../../model/tour/tour';
import { TourDetail } from '../../model/tour/tour-detail';
import { TourDetailContent } from '../../model/tour/tour-detail-content';
import { TourDetailService } from '../../service/tour/tour-detail.service';
import { TourService } from '../../service/tour/tour.service';

@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.scss']
})
export class TourDetailComponent implements OnInit {

  currentLang: string = this.tourDetailService.getCurrentLang()?.key;
  tripPath: string = "";
  desPath: string = "";
  tourPath: string = "";
  isShowImageRepo: boolean = false;
  tourDetail: TourDetail = new TourDetail();
  tour: Tour = new Tour();
  tourDetailContent: TourDetailContent = new TourDetailContent();
  tourDetailContents: TourDetailContent[] = [];
  constructor(public tourDetailService: TourDetailService, public tourService: TourService, public transshipmentService: TransshipmentService) { }
  ngOnInit(): void {
    this.desPath = this.getDesPathFromURL();
    this.tripPath = this.getTripPathFromURL();
    this.tourPath = this.getTourPathFromURL();
    this.getCurrentTourByTourPath();
  }

  getTourPathFromURL() {
    const paths = location.pathname.split('/');
    let path1 = paths.pop() || "";
    return path1;
  }
  getTripPathFromURL() {
    const paths = location.pathname.split('/');
    let path1 = paths.pop() || "";
    let path2 = paths.pop() || "";
    return path2;
  }
  getDesPathFromURL() {
    const paths = location.pathname.split('/');
    let path1 = paths.pop() || "";
    let path2 = paths.pop() || "";
    let path3 = paths.pop() || "";
    return path3;
  }


  /**
   * Lấy về tour master object theo tour path
   *
   * @memberof TourDetailComponent
   */
  getCurrentTourByTourPath() {
    // const fullPath = `${this.desPath}/${this.tripPath}/${this.tourPath}`;
    this.tourService.getTourByTourPath(this.desPath, this.tripPath, this.tourPath).subscribe((data: any) => {
      this.tour = data;
      this.getTourDetailByMasterAndLang(this.tour.id, this.currentLang);
      this.transshipmentService.updateMessage(`Thiết lập nội dung cho tour ${this.tour.title}`);
    })
  }


  /**
   * Lấy về tour detail theo master
   *
   * @param {number} tourId
   * @param {string} lang
   * @memberof TourDetailComponent
   */
  getTourDetailByMasterAndLang(tourId: number, lang: string) {
    this.tourDetailService.getByTourMasterIdAndLang(tourId, lang).subscribe((data: any) => {
    if(data){
      this.tourDetail = data;
      this.tourDetailContents = JSON.parse(this.tourDetail.content);
    }else{
      this.tourDetail = new TourDetail();
    }
    })
  }


  /**
   * Sự kiện thay đổi ngôn ngữ
   *
   * @param {CountryLang} lang
   * @memberof TourDetailComponent
   */
  changedLanguage(lang: CountryLang) {
    this.currentLang = lang.key;
    this.getTourDetailByMasterAndLang(this.tour.id, lang.key);
  }


  /**
   * Popup chọn ảnh banner
   *
   * @memberof TourDetailComponent
   */
  callRepo() {
    this.isShowImageRepo = true;
  }

  isShowTourDetailContentImageRepo: boolean = false;
  callTourRepo(item: TourDetailContent) {
    this.tourDetailContent = item;
    this.isShowTourDetailContentImageRepo = true;
  }

  selectTourImagesDetailContentRepo(data: string) {
    this.tourDetailContent.imgURL = data;
    this.isShowTourDetailContentImageRepo = false;
  }

  endCallRepo() {
    this.isShowImageRepo = false;
  }

  /**
  * Lắng nghe sự kiện select ảnh từ repo
  *
  * @param {string} data
  * @memberof TripDetailComponent
  */
  selectedItem(data: string) {
    this.tourDetail.imageURL = data;
    this.isShowImageRepo = false;
  }

  create() {
    this.tourDetail.desPath = this.desPath;
    this.tourDetail.tripPath = this.tripPath;
    this.tourDetail.tourPath = this.tourPath;
    this.tourDetail.tourMasterId = this.tour.id;
    this.tourDetail.lang = this.currentLang;
    this.tourDetail.content = JSON.stringify(this.tourDetailContents);
    if (!this.tourDetail.id) {
      this.tourDetailService.create(this.tourDetail).subscribe((data: any) => {
        this.tourDetailService.showNoti("Tạo mới thành công");
        this.tourDetail.id = data.id;
      })
    } else {
      this.tourDetailService.edit(this.tourDetail).subscribe((data: any) => {
        this.tourDetailService.showNoti("Cập nhật thành công")
      })
    }


  }

  addNewContent() {
    let obj = new TourDetailContent()
    this.tourDetailContents.push(obj);
  }

  removeElementFromObjectArray(object: any) {
    this.tourDetailContents.forEach((value, index) => {
      if (value.title == object.title) this.tourDetailContents.splice(index, 1);
    });
  }

}
