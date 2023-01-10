import { Component, OnInit } from '@angular/core';
import { DestiantionMaster } from '../model/destination/destiantion-master';
import { DestiantionMasterService } from '../service/destination/destiantion-master.service';
import * as nth from 'src/app/common/util';
import { TransshipmentService } from 'src/app/core/service/transshipment.service';

/**
 * Trang tạo và quản lý 1 điểm đến
 *
 * @export
 * @class DestinationMasterComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-destination-master',
  templateUrl: './destination-master.component.html',
  styleUrls: ['./destination-master.component.scss']
})
export class DestinationMasterComponent implements OnInit {

  masters: DestiantionMaster[] = [];
  master: DestiantionMaster = new DestiantionMaster();
  
  /**
   * biến tạo nút cho popup sửa/xóa Master
   *
   * @type {*}
   * @memberof DestinationMasterComponent
   */
  actionButtonOptions: any;
  
  /**
   * Biến ẩn hiện popup sửa, thêm mới Mastẻ
   *
   * @type {boolean}
   * @memberof DestinationMasterComponent
   */
  popupVisible: boolean = false;

  /**
   * Tên hành động của popup master
   *
   * @type {string}
   * @memberof DestinationMasterComponent
   */
  actionText: string = "";
  
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

  /**
   * Biến ẩn hiện kho ảnh
   *
   * @type {boolean}
   * @memberof DestinationMasterComponent
   */
  isShowImageRepo: boolean = false;

  constructor(public service: DestiantionMasterService,  public transshipmentService: TransshipmentService) { 

    const that = this;
    // this.actionButtonOptions = {
    //   text: "Hoàn tất",
    //   onClick(e: any) {
    //     that.popupVisible = false;
    //     that.handlerAction();
    //   },
    // };
  }

  /**
   * Biến xác định có phải là điểm đến đặc biệt hay không
   *
   * @type {boolean}
   * @memberof DestinationMasterComponent
   */
  isSpecial: boolean = false;

  ngOnInit(): void {
    this.isSpecial = false;
   
    this.getAll();
    this.transshipmentService.updateMessage("Quản lý các điểm đến");
  }

  getAll(){
    this.service.getAll().subscribe((data: any) =>{
      this.masters = data;
      
    })
  }


  /**
   * Hàm xử lý action của popup
   *
   * @memberof DestinationMasterComponent
   */
  handlerAction(){
    if(this.action == nth.action.add){
      // tạo mới
      this.createMaster(this.master);
    }else if(this.action == nth.action.edit){
      this.editMaster(this.master);
    }
  }


  /**
   * Hàm thực hiện gửi request sửa
   *
   * @param {DestiantionMaster} master
   * @memberof DestinationMasterComponent
   */
  editMaster(master: DestiantionMaster){
     master.isSpecial = this.isSpecial;
    this.service.editMaster(master).subscribe((data: any) =>{
      this.service.showNoti("Cập nhật thành công");
      this.endCallRepo();
      this.popupVisible = false;
      this.isSpecial = false;
    })
  }


  /**
   * Hàm thực hiện gửi request thêm mới
   *
   * @param {DestiantionMaster} master
   * @memberof DestinationMasterComponent
   */
  createMaster(master: DestiantionMaster){
    // todo Kiểm tra điểm đến đã tồn tại hay chưa
    master.destinationURL = nth.removeVietnameseTones(master.destinationName);
    master.isSpecial = this.isSpecial;
    this.service.createMaster(master).subscribe((data: any) =>{
      this.service.showNoti("Tạo mới thành công");
      this.getAll();
      this.endCallRepo();
      this.popupVisible = false;
      this.isSpecial = false;
    })
  }

  deleteMaster(id: number){
    this.service.deleteMaster(id).subscribe((data: any) =>{
      const arr = this.masters.filter((item: DestiantionMaster) =>{ 
        return item.id != id
       });
       this.masters = arr;
      this.service.showNoti("Xóa thành công");
    })
  }

  handlerDelete(data: any){
      this.deleteMaster(data);
  }

  handlerEdit(id: number){
    this.popupVisible = true;
    this.action = nth.action.edit;
    this.popupTitle = "Chỉnh sửa điểm đến";
    this.master = this.masters.filter((item: DestiantionMaster) =>{
      return item.id == id;
    })[0];
    this.isSpecial = this.master.isSpecial;
  }


  /**
   * Hàm xử lý khi nhấn nút tạo mới
   *
   * @memberof DestinationMasterComponent
   */
  handlerCreate(){
    this.popupVisible = true;
    this.action = nth.action.add;
    this.popupTitle = "Tạo mới điểm đến";
    this.actionText =  "Tạo mới";
    this.master = new DestiantionMaster();
    this.master.isSpecial = false;
  }

  callRepo(){
    this.isShowImageRepo = true;
  }

  endCallRepo(){
    this.isShowImageRepo = false;
    this.master = new DestiantionMaster();
  }

  /**
   * Lắng nghe sự kiện select ảnh từ repo
   *
   * @param {string} data
   * @memberof DestinationMasterComponent
   */
  selectedItem(data: string){
    this.master.imageURL = data;
    this.isShowImageRepo = false;
  }

}
