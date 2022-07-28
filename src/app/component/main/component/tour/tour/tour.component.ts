import { Component, OnInit } from '@angular/core';
import { DestiantionMaster } from '../../model/destination/destiantion-master';
import { Tour } from '../../model/tour/tour';
import { Trip } from '../../model/trip/trip';
import { DestiantionMasterService } from '../../service/destination/destiantion-master.service';
import { TourService } from '../../service/tour/tour.service';
import { TripService } from '../../service/trip/trip.service';
import * as nth from 'src/app/common/util';
import { TransshipmentService } from 'src/app/core/service/transshipment.service';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss']
})
export class TourComponent implements OnInit {

  desList: DestiantionMaster[] = [];
  des: DestiantionMaster = new DestiantionMaster();
  trips: Trip[] = [];
  trip: Trip = new Trip();
  tours: Tour[] = [];
  tour: Tour = new Tour();

  /**
 * Biến ẩn hiện kho ảnh
 *
 * @type {boolean}
 * @memberof TourComponent
 */
  isShowImageRepo: boolean = false;

  /**
   * Biến ẩn hiện popup sửa, thêm mới Mastẻ
   *
   * @type {boolean}
   * @memberof TourComponent
   */
  popupVisible: boolean = false;

  /**
   *Loại hành động popup master
   *
   * @type {*}
   * @memberof TourComponent
   */
  action: any;

  /**
 * tiêu đề popup master
 *
 * @type {string}
 * @memberof TourComponent
 */
  popupTitle: string = "";

  constructor(public tripService: TripService,  public tourService: TourService,
    public desService: DestiantionMasterService,  public transshipmentService: TransshipmentService) { }

  ngOnInit(): void {
    this.getAllDes();
    this.transshipmentService.updateMessage("Thiết lập nội dung các tour du lịch");
  }


  /**
   * Lấy tất cả des về làm control lựa chọn điểm đến
   *
   * @memberof TourComponent
   */
  getAllDes() {
    this.desService.getAll().subscribe((data: any) => {
      this.desList = data;
      if(this.desList.length >0){
        this.des = this.desList[0];
      }
      //  this.getTripsByDes(this.des.destinationURL);
    })
  }

  /**
   * Lấy tât cả trip theo des về làm control lựa chọn chuyến đi
   *
   * @memberof TourComponent
   */
   getTripsByDes(desURL: string){
    this.tripService.getByDesURL(desURL).subscribe((data: any) =>{
      this.trips = data;
      if(this.trips.length >0){
        this.trip = this.trips[0]
      }
      // this.getTourByTripMaster(this.trip.id);
    })
  }

  getTourByTripMaster(tripId: number){
    this.tourService.getTourByTripMaster(tripId).subscribe((data: any) =>{
      this.tours = data;
      if(this.tours.length > 0){
        this.tour = this.tours[0];
      }
    })
  }


  // getTourByDesTrip(desURL: string, tripURL: string) {
  //   this.tourService.getByDesTrip(desURL, tripURL).subscribe((data: any) => {
  //     this.tours = data;
  //     if(this.tours.length > 0){
  //       this.tour = this.tours[0];
  //     }
  //   }, (error: any) => {
  //     this.trip = new Trip();
  //   })
  // }


  /**
   * Sự kiện thay đổi des
   *
   * @param {string} desURL
   * @memberof TourComponent
   */
  changedDes(desURL: string) {
    this.getTripsByDes(desURL);
  }


  /**
   * Sự kiện thay đổi trip
   *
   * @param {number} tripId
   * @memberof TourComponent
   */
  changedTrip(tripId: number) {
    this.getTourByTripMaster(tripId);
  }



  /**
   * Hàm xử lý khi chỉnh sửa 1 tour
   *
   * @param {number} tourId
   * @memberof TourComponent
   */
  handlerEdit(tourId: number) {
    this.popupVisible = true;
    this.action = nth.action.edit;
    this.popupTitle = "Chỉnh sửa tour";
    this.tour = this.tours.filter((item: Tour) => {
      return item.id == tourId;
    })[0];
  }


  /**
   * Hàm xử lý khi nhấn nút tạo mới
   *
   * @memberof TourComponent
   */
  handlerCreate() {
    this.popupVisible = true;
    this.action = nth.action.add;
    this.popupTitle = "Tạo mới Tour";
    this.tour = new Tour();
  }

  handlerDelete(data: any) {
    this.deleteMaster(data);
  }


  /**
   * Hàm xử lý action của popup
   *
   * @memberof TourComponent
   */
  handlerAction() {
    if (this.action == nth.action.add) {
      // tạo mới
      this.createMaster(this.tour);
    } else if (this.action == nth.action.edit) {
      this.editMaster(this.tour);
    }
  }


  /**
   * Hàm thực hiện gửi request sửa
   *
   * @param {DestiantionMaster} master
   * @memberof TourComponent
   */
  editMaster(tour: Tour) {
    // const tourSubPath = nth.removeVietnameseTones(tour.title);
    // tour.tourPath = `${this.trip.tripURL}/${tourSubPath}`;
    this.tourService.edit(tour).subscribe((data: any) => {
      this.tourService.showNoti("Cập nhật thành công");
      this.endCallRepo();
      this.popupVisible = false;
    })
  }


  /**
   * Hàm thực hiện gửi request thêm mới
   *
   * @param {Tour} tour
   * @memberof TourComponent
   */
  createMaster(tour: Tour) {
    // todo Kiểm tra điểm đến đã tồn tại hay chưa
    const tourSubPath = nth.removeVietnameseTones(tour.title);
    tour.tripPath = this.trip.tripURL;
    tour.desPath = this.des.destinationURL;
    // tour.tourPath = `${this.trip.tripURL}/${tourSubPath}`;
    tour.tourPath = `${tourSubPath}`;
    tour.tripId = this.trip.id;
    this.tourService.create(tour).subscribe((data: any) => {
      this.tourService.showNoti("Tạo mới thành công");
      this.tours.unshift(data);
      this.endCallRepo();
      this.popupVisible = false;
      this.tour.id = data.id;

    })
  }

  callRepo(){
    this.isShowImageRepo = true;
  }

  endCallRepo() {
    this.isShowImageRepo = false;
    this.tour = new Tour();
  }

  deleteMaster(id: number) {
    this.tourService.delete(id).subscribe((data: any) => {
      const arr = this.tours.filter((item: Tour) => {
        return item.id != id
      });
      this.tours = arr;
      this.tourService.showNoti("Xóa thành công");
    })
  }

  

  
  /**
   * Lắng nghe sự kiện select ảnh từ repo
   *
   * @param {string} data
   * @memberof TourComponent
   */
   selectedItem(data: string){
    this.tour.imageURL = data;
    this.isShowImageRepo = false;
  }

}
