import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Folder } from '../model/folder';
import { FolderImage } from '../model/folder-image';
import { FolderService } from '../service/folder.service';
import { ImageService } from '../service/image.service';
import * as nth from 'src/app/common/util'
import notify from 'devextreme/ui/notify';
import { TransshipmentService } from 'src/app/core/service/transshipment.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


/**
 * Quản lý Des Folder
 *
 * @export
 * @class ImageComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

  constructor(public folderService: FolderService, public imageService: ImageService, public transshipmentService: TransshipmentService, private http: HttpClient) { }
  
  /**
   * Dùng cho việc tạo mới folder
   *
   * @type {Folder}
   * @memberof ImageComponent
   */
  folderCreate: Folder = new Folder();
  
  /**
   * Dùng cho các việc liên quan đến current forlder
   *
   * @type {Folder}
   * @memberof ImageComponent
   */
  folder: Folder = new Folder();


  /**
   * datasource
   *
   * @type {Folder[]}
   * @memberof ImageComponent
   */
  folders: Folder[] = [];


  /**
   * Danh sách ảnh
   *
   * @type {FolderImage[]}
   * @memberof ImageComponent
   */
  images: FolderImage[] = [];

  /**
   * Đường dẫn ảnh
   *
   * @memberof ImageComponent
   */
  urlImg = nth.urlImg;

  
  /**
   * xác định là màn hình thiết lập chính hay được gọi từ nơi khác.
   * true: chính
   * false: gọi từ nơi khác
   *
   * @type {boolean}
   * @memberof ImageComponent
   */
  @Input() isMain: boolean = true;
  @Output() selectedItem = new EventEmitter<any>();
  /**
   * Quản lý danh sách và folder Des
   *
   * @memberof ImageComponent
   */
  ngOnInit(): void {
    this.getDesFolders();
    if(this.isMain){
      this.transshipmentService.updateMessage("Quản lý ảnh các điểm đến");
    }
  }
  createFolder(event: any) {
    if(this.folderValidate()){
      this.folderService.createDestination(this.folderCreate).subscribe((data: any) => {
        this.folders.unshift(data);
        this.getDesFolders();
        this.folderCreate = new Folder();
      })
    }else{
      this.imageService.showNoti("Tên folder không được để trống", "error")
    }
    
  }

  getDesFolders() {
    this.folderService.getDes().subscribe((data: any) => {
      this.folders = data;
      if (this.folders.length > 0) {
        this.folder = this.folders[0];
        this.getImagesByDesId(this.folders[0].id);
      }
    })
  }
desId: number = -1;
  getImagesByDesId(desId: number) {
    this.desId = desId;
    this.imageService.getImageByDesId(desId).subscribe((data: any) => {
      this.images = data;
    })
  }

  getImagesByDe(event: any){
    console.log(event);
    console.log(this.folder);
    
  }

  copyLink(item: FolderImage){
    navigator.clipboard.writeText(`${this.urlImg}Destination/${item.folderName}/${item.imageName}`);
    this.showNoti('Đã copy!')
  }
  deleteService(url): Observable<any>{
    let reqHeader = new HttpHeaders({ 'Content-Type': 'application/json','No-Auth':'True' });
    
    return this.http.delete(url, {headers:reqHeader, responseType: 'text'});
  }

  deleteItem(item: FolderImage){
    
    let url = `${nth.urlAPI}api/Upload/Destination/${item.folderName}/${item.imageName}/${item.id}`;
    this.deleteService(url).subscribe(()=>{
      console.log("delete: ", url);
      this.showNoti('Đã xóa ảnh!');
      const arr = this.images.filter((it: any) =>{ 
        return it.id != item.id
       });
       this.images = arr;
    });
  }

  /**
   * Hàm bắn event cho child khi lựa chọn 1 item
   *
   * @param {FolderImage} item
   * @memberof ImageComponent
   */
  select(item: FolderImage){
    this.selectedItem.emit(`${this.urlImg}Destination/${item.folderName}/${item.imageName}`);
  }

  
  showNoti(message: string) {
    let position : object = {
      top: 50,
      bottom: undefined,
      left: undefined,
      right: 50,
    };
    notify({
      message: message,
      height: 45,
      width: 150,
      minWidth: 150,
      type: 'success',
      displayTime: 1000,
      animation: {
        show: {
          type: 'fade', duration: 400, from: 0, to: 1,
        },
        hide: { type: 'fade', duration: 40, to: 0 },
      }
      
    },
    { position })
  }

  folderValidate(): boolean{
    if(!this.folderCreate.name) return false;
    return true;
  }

  isShowCopy = '';
  isShowDelete = '';
  toggleDelete(x) {
    this.isShowDelete = x
  }

  toggleCopy(x) {
    this.isShowCopy = x
  }


}
