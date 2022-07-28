import { Component, OnInit } from '@angular/core';
import { TransshipmentService } from 'src/app/core/service/transshipment.service';
import { CountryLang } from 'src/app/shared/model/country-lang';
import { Destiantion } from '../model/destination/destiantion';
import { DestiantionService } from '../service/destination/destiantion.service';

/**
 * Tạo và quản lý chi tiết điểm đến
 *
 * @export
 * @class DestinationComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss']
})
export class DestinationComponent implements OnInit {

  constructor(public destiantionService: DestiantionService, public transshipmentService: TransshipmentService) { }
  desURL: string = "";
  currentLang: string = this.destiantionService.getCurrentLang()?.key;
  destination: Destiantion = new Destiantion();

    /**
   * Biến ẩn hiện kho ảnh
   *
   * @type {boolean}
   * @memberof DestinationMasterComponent
   */
     isShowImageRepo: boolean = false;
  ngOnInit(): void {
    this.desURL= this.getDestinationFromURL();
    this.getDesByMasterAndLang(this.desURL, this.currentLang);
  }

  getDestinationFromURL(){
    return location.pathname.split('/').pop() || "";
  }

  getDesByMasterAndLang(masterURL: string, lang: string){
    if(masterURL && lang){
      this.destiantionService.getDestinationByMasterAndLang(masterURL, lang).subscribe((data: Destiantion) =>{
        this.destination = data;
        this.transshipmentService.updateMessage(`Thiết lập nội dung cho điểm đến ${this.destination.destinationName}`);
      },
      error =>{
        this.destination = new Destiantion();
      })
    }
  }

  create(){
    this.destination.lang = this.currentLang;
    this.destination.destinationURL = this.desURL;
    if(!this.destination.id){
      this.destiantionService.create(this.destination).subscribe((data: any) =>{
        this.destiantionService.showNoti("Tạo mới thành công");
        this.destination.id = data.id;
      })
    }else{
      this.destiantionService.edit(this.destination).subscribe((data: any) =>{
        this.destiantionService.showNoti("Cập nhật thành công")
      })
    }
    
  }

  changedLanguage(lang: CountryLang){
    this.currentLang = lang.key;
    this.getDesByMasterAndLang(this.desURL, lang.key);
  }

  update(){
    this.destination.lang = this.currentLang;
    this.destination.destinationURL = this.desURL;
    this.destiantionService.edit(this.destination).subscribe((data: any) =>{
      this.destiantionService.showNoti("Tạo mới thành công")
    })
  }


  callRepo(){
    this.isShowImageRepo = true;
  }

  endCallRepo(){
    this.isShowImageRepo = false;
  }

  /**
   * Lắng nghe sự kiện select ảnh từ repo
   *
   * @param {string} data
   * @memberof DestinationMasterComponent
   */
  selectedItem(data: string){
    this.destination.bannerImage = data;
    this.isShowImageRepo = false;
  }

}
