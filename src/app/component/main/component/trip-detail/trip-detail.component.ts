import { Component, OnInit } from '@angular/core';
import { TransshipmentService } from 'src/app/core/service/transshipment.service';
import { CountryLang } from 'src/app/shared/model/country-lang';
import { Trip } from '../model/trip/trip';
import { TripDetail } from '../model/trip/trip-detail';
import { TripDetailService } from '../service/trip/trip-detail.service';
import { TripService } from '../service/trip/trip.service';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss']
})
export class TripDetailComponent implements OnInit {

  trip: Trip = new Trip();
  tripDetail: TripDetail = new TripDetail();
  
  trips: Trip[] = [];
  tripDetails: TripDetail[] = [];

  currentLang: string = this.tripDetailService.getCurrentLang()?.key;
  tripPath: string = "";
  desPath: string = "";
  isShowImageRepo: boolean = false;
  constructor(public tripDetailService: TripDetailService, public tripService: TripService, public transshipmentService: TransshipmentService) { }

  ngOnInit(): void {
    this.tripPath = this.getTripPathFromURL();
    this.desPath = this.getDesPathFromURL();
    this.getMasterTripByFullTripURL(this.desPath, this.tripPath);
   

  }

  getMasterTripByFullTripURL(desPath: string, tripPath: string){
    this.tripService.getTripByDesAndFullTrip(desPath, tripPath).subscribe((data: any) =>{
      this.trips = data;
      if(this.trips.length > 0){
        this.trip = data[0];
        this.transshipmentService.updateMessage(`Thiết lập nội dung chuyến đi ${this.trip.tripName}`);
      }
      this.getByTripPathAndLang(this.trip.id, this.currentLang);
    })
  }



  getTripPathFromURL(){
    const paths = location.pathname.split('/');
    let path1 = paths.pop() || "";
    return path1;
  }
  getDesPathFromURL(){
    const paths = location.pathname.split('/');
    let path1 = paths.pop() || "";
    let path2 = paths.pop() || "";
    return path2;
  }
  
  create(){
    this.tripDetail.lang = this.currentLang;
    this.tripDetail.tripURL = this.tripPath;
    this.tripDetail.destinationURL = this.desPath;
    this.tripDetail.tripMasterId = this.trip.id
    if(!this.tripDetail.id){
      this.tripDetailService.create(this.tripDetail).subscribe((data: any) =>{
        this.tripDetailService.showNoti("Tạo mới thành công");
        this.tripDetail.id = data.id;
      })
    }else{
      this.tripDetailService.edit(this.tripDetail).subscribe((data: any) =>{
        this.tripDetailService.showNoti("Cập nhật thành công")
      })
    }
    
  }

  update(){
    this.tripDetail.lang = this.currentLang;
    this.tripDetail.tripURL = this.tripPath;
    this.tripDetailService.edit(this.tripDetail).subscribe((data: any) =>{
      this.tripDetailService.showNoti("Tạo mới thành công")
    })
  }


  callRepo(){
    this.isShowImageRepo = true;
  }

  endCallRepo(){
    this.isShowImageRepo = false;
  }

  getByTripPathAndLang(tripMasterId: number, lang: string){
      this.tripDetailService.getByTripMasterIdAndLang(tripMasterId, lang).subscribe((data: TripDetail) =>{
        if(data){
          this.tripDetail = data;
        }else{
          this.tripDetail = new TripDetail();
        }
      },
      error =>{
        this.tripDetail = new TripDetail();
      })
  }

  changedLanguage(lang: CountryLang){
    this.currentLang = lang.key;
    this.getByTripPathAndLang(this.trip.id, lang.key);
  }

  /**
   * Lắng nghe sự kiện select ảnh từ repo
   *
   * @param {string} data
   * @memberof TripDetailComponent
   */
   selectedItem(data: string){
    this.tripDetail.imageURL = data;
    this.isShowImageRepo = false;
  }

}
