import { Component, OnInit } from '@angular/core';
import { TransshipmentService } from 'src/app/core/service/transshipment.service';
import { CountryLang } from 'src/app/shared/model/country-lang';
import { Blog } from '../model/blog';
import { BlogService } from '../service/blog.service';


/**
 * Trang tạo nội dung của 1 blog như banner, text giới thiệu
 *
 * @export
 * @class BlogComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor(public blogService: BlogService, public transshipmentService: TransshipmentService) { }
  blogURL: string = "";
  currentLang: string = this.blogService.getCurrentLang()?.key;
  blog: Blog = new Blog();

  /**
 * Biến ẩn hiện kho ảnh
 *
 * @type {boolean}
 * @memberof BlogComponent
 */
  isShowImageRepo: boolean = false;
  ngOnInit(): void {
    this.blogURL = this.getBlogFromURL();
    this.getBlogByMasterAndLang(this.blogURL, this.currentLang);
  }

  getBlogFromURL() {
    return location.pathname.split('/').pop() || "";
  }

  getBlogByMasterAndLang(masterURL: string, lang: string) {
    if (masterURL && lang) {
      this.blogService.getBlogByMasterAndLang(masterURL, lang).subscribe((data: Blog) => {
        if (data) {
          this.blog = data;
          this.transshipmentService.updateMessage(`Thiết lập nội dung cho blog ${this.blog.blogName}`);
        } else {
          this.blog = new Blog();
        }
      },
        error => {
          this.blog = new Blog();
        })
    }
  }

  create() {
    this.blog.lang = this.currentLang;
    this.blog.blogURL = this.blogURL;
    if (!this.blog.id) {
      this.blogService.create(this.blog).subscribe((data: any) => {
        this.blogService.showNoti("Tạo mới thành công");
        this.blog.id = data.id;
      })
    } else {
      this.blogService.edit(this.blog).subscribe((data: any) => {
        this.blogService.showNoti("Cập nhật thành công")
      })
    }

  }

  changedLanguage(lang: CountryLang) {
    this.currentLang = lang.key;
    this.getBlogByMasterAndLang(this.blogURL, lang.key);
  }

  update() {
    this.blog.lang = this.currentLang;
    this.blog.blogURL = this.blogURL;
    this.blogService.edit(this.blog).subscribe((data: any) => {
      this.blogService.showNoti("Tạo mới thành công")
    })
  }


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
   * @memberof BlogComponent
   */
  selectedItem(data: string) {
    this.blog.bannerImage = data;
    this.isShowImageRepo = false;
  }


}
