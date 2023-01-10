import { Component, OnInit } from '@angular/core';
import { TransshipmentService } from 'src/app/core/service/transshipment.service';
import { Blog } from '../model/blog';
import { BlogDetail } from '../model/blog-detail';
import { BlogDetailService } from '../service/blog-detail.service';
import { BlogMasterService } from '../service/blog-master.service';
import * as nth from 'src/app/common/util';


/**
 *Trang tao danh sach bai viet
 *
 * @export
 * @class BlogDetailComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {

  constructor(public blogDetailService: BlogDetailService, public blogMasterSerivce: BlogMasterService,  public transshipmentService: TransshipmentService) { }
  blogList: Blog[] = [];
  blog: Blog = new Blog();
  blogDetails: BlogDetail[] = [];
  blogDetail: BlogDetail = new BlogDetail();

  /**
 * Biến ẩn hiện kho ảnh
 *
 * @type {boolean}
 * @memberof BlogDetailComponent
 */
  isShowImageRepo: boolean = false;

  /**
   * Biến ẩn hiện popup sửa, thêm mới Mastẻ
   *
   * @type {boolean}
   * @memberof BlogDetailComponent
   */
  popupVisible: boolean = false;

  /**
   *Loại hành động popup master
   *
   * @type {*}
   * @memberof BlogDetailComponent
   */
  action: any;

  /**
 * tiêu đề popup master
 *
 * @type {string}
 * @memberof BlogDetailComponent
 */
  popupTitle: string = "";

  ngOnInit(): void {
    this.getAllDes();
    this.transshipmentService.updateMessage("Quản lý các bài viết");
  }


  getAllDes() {
    this.blogMasterSerivce.getAll().subscribe((data: any) => {
      this.blogList = data;
      if(this.blogList.length >0){
        this.blog = this.blogList[0];
      }
      // this.getTripByDes(this.des.destinationURL);
    })
  }


  getDetailByBlog(blogURL: string) {
    this.blogDetailService.getByBlogURL(blogURL).subscribe((data: any) => {
      this.blogDetails = data;
      if(this.blogDetails.length > 0){
        this.blogDetail = this.blogDetails[0];
      }
    }, (error: any) => {
      this.blogDetail = new BlogDetail();
    })
  }

  changedDes() {
    this.getDetailByBlog(this.blog.blogURL);
  }


  handlerEdit(id: number) {
    this.popupVisible = true;
    this.action = nth.action.edit;
    this.popupTitle = "Chỉnh sửa điểm đến";
    this.blogDetail = this.blogDetails.filter((item: BlogDetail) => {
      return item.id == id;
    })[0];
  }


  /**
   * Hàm xử lý khi nhấn nút tạo mới
   *
   * @memberof BlogDetailComponent
   */
  handlerCreate() {
    this.popupVisible = true;
    this.action = nth.action.add;
    this.popupTitle = "Tạo mới chuyến đi";
    this.blogDetail = new BlogDetail();
  }


  /**
   * Hàm xử lý action của popup
   *
   * @memberof BlogDetailComponent
   */
  handlerAction() {
    if (this.action == nth.action.add) {
      // tạo mới
      this.createMaster(this.blogDetail);
    } else if (this.action == nth.action.edit) {
      this.editMaster(this.blogDetail);
    }
  }


  /**
   * Hàm thực hiện gửi request sửa
   *
   * @param {DestiantionMaster} master
   * @memberof BlogDetailComponent
   */
  editMaster(blogDetail: BlogDetail) {
    // const tripSubPath = nth.removeVietnameseTones(trip.tripName);
    // trip.tripURL = `${this.des.destinationURL}/${tripSubPath}`;
    this.blogDetailService.editMaster(blogDetail).subscribe((data: any) => {
      this.blogDetailService.showNoti("Cập nhật thành công");
      this.endCallRepo();
      this.popupVisible = false;
    })
  }


  /**
   * Hàm thực hiện gửi request thêm mới
   *
   * @param {Trip} trip
   * @memberof BlogDetailComponent
   */
  createMaster(blogDetail: BlogDetail) {
    // todo Kiểm tra điểm đến đã tồn tại hay chưa
    const blogDetailSubPath = nth.removeVietnameseTones(blogDetail.blogDetailName);
    blogDetail.blogDetailURL = `${this.blog.blogURL}/${blogDetailSubPath}`;
    blogDetail.blogURL = this.blog.blogURL;
    this.blogDetailService.createMaster(blogDetail).subscribe((data: any) => {
      this.blogDetailService.showNoti("Tạo mới thành công");
      this.getDetailByBlog(this.blog.blogURL);
      this.endCallRepo();
      this.popupVisible = false;
    })
  }

  callRepo(){
    this.isShowImageRepo = true;
  }

  endCallRepo() {
    this.isShowImageRepo = false;
    this.blogDetail = new BlogDetail();
  }

  deleteMaster(id: number) {
    this.blogDetailService.deleteMaster(id).subscribe((data: any) => {
      const arr = this.blogDetails.filter((item: BlogDetail) => {
        return item.id != id
      });
      this.blogDetails = arr;
      this.blogDetailService.showNoti("Xóa thành công");
    })
  }

  handlerDelete(data: any) {
    this.deleteMaster(data);
  }

  
  /**
   * Lắng nghe sự kiện select ảnh từ repo
   *
   * @param {string} data
   * @memberof BlogDetailComponent
   */
   selectedItem(data: string){
    this.blogDetail.imageURL = data;
    this.isShowImageRepo = false;
  }
}
