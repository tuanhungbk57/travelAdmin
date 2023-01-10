import { Component, OnInit } from '@angular/core';
import { TransshipmentService } from 'src/app/core/service/transshipment.service';
import { BlogMaster } from '../model/blog-master';
import { BlogMasterService } from '../service/blog-master.service';
import * as nth from 'src/app/common/util';


/**
 * Trang tạo các blog tương ứng với điểm đến
 *
 * @export
 * @class BlogMasterComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-blog-master',
  templateUrl: './blog-master.component.html',
  styleUrls: ['./blog-master.component.scss']
})
export class BlogMasterComponent implements OnInit {

  masters: BlogMaster[] = [];
  master: BlogMaster = new BlogMaster();
  
  /**
   * biến tạo nút cho popup sửa/xóa Master
   *
   * @type {*}
   * @memberof BlogMasterComponent
   */
  actionButtonOptions: any;
  
  /**
   * Biến ẩn hiện popup sửa, thêm mới Mastẻ
   *
   * @type {boolean}
   * @memberof BlogMasterComponent
   */
  popupVisible: boolean = false;

  /**
   * Tên hành động của popup master
   *
   * @type {string}
   * @memberof BlogMasterComponent
   */
  actionText: string = "";
  
  /**
   *Loại hành động popup master
   *
   * @type {*}
   * @memberof BlogMasterComponent
   */
  action: any;
  
  /**
   * tiêu đề popup master
   *
   * @type {string}
   * @memberof BlogMasterComponent
   */
  popupTitle: string = "";

  /**
   * Biến ẩn hiện kho ảnh
   *
   * @type {boolean}
   * @memberof BlogMasterComponent
   */
  isShowImageRepo: boolean = false;

  constructor(public service: BlogMasterService,  public transshipmentService: TransshipmentService) { 

  }

  ngOnInit(): void {
    this.getAll();
    this.transshipmentService.updateMessage("Quản lý các blog");
  }

  getAll(){
    this.service.getAll().subscribe((data: any) =>{
      this.masters = data;
    })
  }


  /**
   * Hàm xử lý action của popup
   *
   * @memberof BlogMasterComponent
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
   * @param {BlogMaster} master
   * @memberof BlogMasterComponent
   */
  editMaster(master: BlogMaster){
    this.service.editMaster(master).subscribe((data: any) =>{
      this.service.showNoti("Cập nhật thành công");
      this.endCallRepo();
      this.popupVisible = false;
    })
  }


  /**
   * Hàm thực hiện gửi request thêm mới
   *
   * @param {BlogMaster} master
   * @memberof BlogMasterComponent
   */
  createMaster(master: BlogMaster){
    // todo Kiểm tra điểm đến đã tồn tại hay chưa
    master.blogURL = nth.removeVietnameseTones(master.blogName)
    this.service.createMaster(master).subscribe((data: any) =>{
      this.service.showNoti("Tạo mới thành công");
      this.getAll();
      this.endCallRepo();
      this.popupVisible = false;
    })
  }

  deleteMaster(id: number){
    this.service.deleteMaster(id).subscribe((data: any) =>{
      const arr = this.masters.filter((item: BlogMaster) =>{ 
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
    this.popupTitle = "Chỉnh sửa blog";
    this.master = this.masters.filter((item: BlogMaster) =>{
      return item.id == id;
    })[0];
  }


  /**
   * Hàm xử lý khi nhấn nút tạo mới
   *
   * @memberof BlogMasterComponent
   */
  handlerCreate(){
    this.popupVisible = true;
    this.action = nth.action.add;
    this.popupTitle = "Tạo mới blog";
    this.actionText =  "Tạo mới";
    this.master = new BlogMaster();
  }

  callRepo(){
    this.isShowImageRepo = true;
  }

  endCallRepo(){
    this.isShowImageRepo = false;
    this.master = new BlogMaster();
  }

  /**
   * Lắng nghe sự kiện select ảnh từ repo
   *
   * @param {string} data
   * @memberof BlogMasterComponent
   */
  selectedItem(data: string){
    this.master.imageURL = data;
    this.isShowImageRepo = false;
  }

}
