import { Component, OnInit } from '@angular/core';
import { TransshipmentService } from 'src/app/core/service/transshipment.service';
import { CountryLang } from 'src/app/shared/model/country-lang';
import { BlogDetail } from '../model/blog-detail';
import { BlogPost } from '../model/blog-post';
import { BlogPostContent } from '../model/blog-post-content';
import { BlogDetailService } from '../service/blog-detail.service';
import { BlogPostService } from '../service/blog-post.service';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {

  currentLang: string = this.blogPostService.getCurrentLang()?.key;
  blogDetailPath: string = "";
  blogPath: string = "";
  isShowImageRepo: boolean = false;
  blogPost: BlogPost = new BlogPost();
  blogDetail: BlogDetail = new BlogDetail();
  blogPostContent: BlogPostContent = new BlogPostContent();
  blogPostContents: BlogPostContent[] = [];
  constructor(public blogPostService: BlogPostService, public blogDetailService: BlogDetailService, public transshipmentService: TransshipmentService) { }
  ngOnInit(): void {
    this.blogPath = this.getBlogPathFromURL();
    this.blogDetailPath = this.getBlogDetailPathFromURL();
    this.getCurrentBlogDetailByBlogDetailPath();
  }


  getBlogDetailPathFromURL() {
    const paths = location.pathname.split('/');
    let path1 = paths.pop() || "";
    return path1;
  }
  getBlogPathFromURL() {
    const paths = location.pathname.split('/');
    let path1 = paths.pop() || "";
    let path2 = paths.pop() || "";
    return path2;
  }


  /**
   * Lấy về blogDetail master object theo blogDetail path
   *
   * @memberof BlogPostComponent
   */
  getCurrentBlogDetailByBlogDetailPath() {
    this.blogDetailService.getBlogDetailByBlogDetailPath(this.blogPath, this.blogDetailPath).subscribe((data: any) => {
      if (data.length > 0) {
        this.blogDetail = data[0];
        this.getBlogPostByMasterAndLang(this.blogDetail.id, this.currentLang);
        this.transshipmentService.updateMessage(`Thiết lập nội dung cho blogDetail ${this.blogDetail.blogDetailName}`);
      }

    })
  }


  /**
   * Lấy về blogDetail detail theo master
   *
   * @param {number} blogDetailID
   * @param {string} lang
   * @memberof BlogPostComponent
   */
  getBlogPostByMasterAndLang(blogDetailID: number, lang: string) {
    this.blogPostService.getByBlogDetailIdAndLang(blogDetailID, lang).subscribe((data: any) => {
      if (data) {
        this.blogPost = data;
        this.blogPostContents = JSON.parse(this.blogPost.content);
      } else {
        this.blogPost = new BlogPost();
      }
    })
  }


  /**
   * Sự kiện thay đổi ngôn ngữ
   *
   * @param {CountryLang} lang
   * @memberof BlogPostComponent
   */
  changedLanguage(lang: CountryLang) {
    this.currentLang = lang.key;
    this.getBlogPostByMasterAndLang(this.blogDetail.id, lang.key);
  }


  /**
   * Popup chọn ảnh banner
   *
   * @memberof BlogPostComponent
   */
  callRepo() {
    this.isShowImageRepo = true;
  }

  isShowBlogPostContentImageRepo: boolean = false;
  callTourRepo(item: BlogPostContent) {
    this.blogPostContent = item;
    this.isShowBlogPostContentImageRepo = true;
  }

  selectTourImagesDetailContentRepo(data: string) {
    this.blogPostContent.imgURL = data;
    this.isShowBlogPostContentImageRepo = false;
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
    this.blogPost.imageURL = data;
    this.isShowImageRepo = false;
  }

  create() {
    this.blogPost.blogURL = this.blogPath;
    this.blogPost.blogDetailURL = this.blogDetailPath;
    this.blogPost.blogDetailID = this.blogDetail.id;
    this.blogPost.lang = this.currentLang;
    this.blogPost.content = JSON.stringify(this.blogPostContents);
    if (!this.blogPost.id) {
      this.blogPostService.create(this.blogPost).subscribe((data: any) => {
        this.blogPostService.showNoti("Tạo mới thành công");
        this.blogPost.id = data.id;
      })
    } else {
      this.blogPostService.edit(this.blogPost).subscribe((data: any) => {
        this.blogPostService.showNoti("Cập nhật thành công")
      })
    }


  }

  addNewContent() {
    let obj = new BlogPostContent()
    this.blogPostContents.push(obj);
  }

  removeElementFromObjectArray(object: any) {
    this.blogPostContents.forEach((value, index) => {
      if (value.title == object.title) this.blogPostContents.splice(index, 1);
    });
  }


}
