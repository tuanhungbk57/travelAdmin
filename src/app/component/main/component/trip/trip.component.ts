import { Component, OnInit } from '@angular/core';
import { DestiantionMaster } from '../model/destination/destiantion-master';
import { Trip } from '../model/trip/trip';
import { DestiantionMasterService } from '../service/destination/destiantion-master.service';
import { TripService } from '../service/trip/trip.service';
import * as nth from 'src/app/common/util';
import { TransshipmentService } from 'src/app/core/service/transshipment.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {

  constructor(public tripService: TripService, public desService: DestiantionMasterService, public transshipmentService: TransshipmentService) { }
  desList: DestiantionMaster[] = [];
  des: DestiantionMaster = new DestiantionMaster();
  trips: Trip[] = [];
  trip: Trip = new Trip();

  /**
 * Biến ẩn hiện kho ảnh
 *
 * @type {boolean}
 * @memberof DestinationMasterComponent
 */
  isShowImageRepo: boolean = false;

  /**
   * Biến ẩn hiện popup sửa, thêm mới Mastẻ
   *
   * @type {boolean}
   * @memberof DestinationMasterComponent
   */
  popupVisible: boolean = false;

  /**
   *Loại hành động popup master
   *
   * @type {*}
   * @memberof DestinationMasterComponent
   */
  action: any;

  /**
 * tiêu đề popup master
 *
 * @type {string}
 * @memberof DestinationMasterComponent
 */
  popupTitle: string = "";

  ngOnInit(): void {
    this.getAllDes();
    this.transshipmentService.updateMessage("Quản lý các chuyến đi");
  }


  getAllDes() {
    this.desService.getAll().subscribe((data: any) => {
      this.desList = data;
      if(this.desList.length >0){
        this.des = this.desList[0];
      }
      // this.getTripByDes(this.des.destinationURL);
    })
  }


  getTripByDes(desURL: string) {
    this.tripService.getByDesURL(desURL).subscribe((data: any) => {
      this.trips = data;
      if(this.trips.length > 0){
        this.trip = this.trips[0];
      }
    }, (error: any) => {
      this.trip = new Trip();
    })
  }

  changedDes() {
    this.getTripByDes(this.des.destinationURL);
  }


  handlerEdit(id: number) {
    this.popupVisible = true;
    this.action = nth.action.edit;
    this.popupTitle = "Chỉnh sửa điểm đến";
    this.trip = this.trips.filter((item: Trip) => {
      return item.id == id;
    })[0];
  }


  /**
   * Hàm xử lý khi nhấn nút tạo mới
   *
   * @memberof DestinationMasterComponent
   */
  handlerCreate() {
    this.popupVisible = true;
    this.action = nth.action.add;
    this.popupTitle = "Tạo mới chuyến đi";
    this.trip = new Trip();
  }


  /**
   * Hàm xử lý action của popup
   *
   * @memberof DestinationMasterComponent
   */
  handlerAction() {
    if (this.action == nth.action.add) {
      // tạo mới
      this.createMaster(this.trip);
    } else if (this.action == nth.action.edit) {
      this.editMaster(this.trip);
    }
  }


  /**
   * Hàm thực hiện gửi request sửa
   *
   * @param {DestiantionMaster} master
   * @memberof DestinationMasterComponent
   */
  editMaster(trip: Trip) {
    // const tripSubPath = nth.removeVietnameseTones(trip.tripName);
    // trip.tripURL = `${this.des.destinationURL}/${tripSubPath}`;
    this.tripService.editMaster(trip).subscribe((data: any) => {
      this.tripService.showNoti("Cập nhật thành công");
      this.endCallRepo();
      this.popupVisible = false;
    })
  }


  /**
   * Hàm thực hiện gửi request thêm mới
   *
   * @param {Trip} trip
   * @memberof TripComponent
   */
  createMaster(trip: Trip) {
    // todo Kiểm tra điểm đến đã tồn tại hay chưa
    const tripSubPath = nth.removeVietnameseTones(trip.tripName);
    trip.tripURL = `${this.des.destinationURL}/${tripSubPath}`;
    trip.destinationURL = this.des.destinationURL;
    this.tripService.createMaster(trip).subscribe((data: any) => {
      this.tripService.showNoti("Tạo mới thành công");
      this.getTripByDes(this.des.destinationURL);
      this.endCallRepo();
      this.popupVisible = false;
    })
  }

  callRepo(){
    this.isShowImageRepo = true;
  }

  endCallRepo() {
    this.isShowImageRepo = false;
    this.trip = new Trip();
  }

  deleteMaster(id: number) {
    this.tripService.deleteMaster(id).subscribe((data: any) => {
      const arr = this.trips.filter((item: Trip) => {
        return item.id != id
      });
      this.trips = arr;
      this.tripService.showNoti("Xóa thành công");
    })
  }

  handlerDelete(data: any) {
    this.deleteMaster(data);
  }

  
  /**
   * Lắng nghe sự kiện select ảnh từ repo
   *
   * @param {string} data
   * @memberof DestinationMasterComponent
   */
   selectedItem(data: string){
    this.trip.imageURL = data;
    this.isShowImageRepo = false;
  }
}
