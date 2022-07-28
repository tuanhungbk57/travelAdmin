import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { Folder } from '../model/folder';
import { FolderImage } from '../model/folder-image';
import { FolderService } from '../service/folder.service';
import { ImageService } from '../service/image.service';
import * as nth from 'src/app/common/util'
import { TransshipmentService } from 'src/app/core/service/transshipment.service';

@Component({
  selector: 'app-image-general',
  templateUrl: './image-general.component.html',
  styleUrls: ['./image-general.component.scss']
})
export class ImageGeneralComponent implements OnInit {

  constructor(public folderService: FolderService, public imageService: ImageService, public transshipmentService: TransshipmentService) { }
  
  /**
   * Dùng cho việc tạo mới folder
   *
   * @type {Folder}
   * @memberof ImageGeneralComponent
   */
  folderCreate: Folder = new Folder();
  
  /**
   * Dùng cho các việc liên quan đến current forlder
   *
   * @type {Folder}
   * @memberof ImageGeneralComponent
   */
  folder: Folder = new Folder();


  /**
   * datasource
   *
   * @type {Folder[]}
   * @memberof ImageGeneralComponent
   */
  folders: Folder[] = [];


  /**
   * Danh sách ảnh
   *
   * @type {FolderImage[]}
   * @memberof ImageGeneralComponent
   */
  images: FolderImage[] = [];

  /**
   * Đường dẫn ảnh
   *
   * @memberof ImageGeneralComponent
   */
  urlImg = nth.urlImg;

  
  /**
   * xác định là màn hình thiết lập chính hay được gọi từ nơi khác.
   * true: chính
   * false: gọi từ nơi khác
   *
   * @type {boolean}
   * @memberof ImageGeneralComponent
   */
  @Input() isMain: boolean = true;
  @Output() selectedItem = new EventEmitter<any>();
  /**
   * Quản lý danh sách và folder Des
   *
   * @memberof ImageGeneralComponent
   */
  ngOnInit(): void {
    this.getGenFolders();
    if(this.isMain){
      this.transshipmentService.updateMessage("Quản lý ảnh dùng chung");
    }
  }
  createFolder(event: any) {
    this.folderService.createGeneral(this.folderCreate).subscribe((data: any) => {
      this.folders.unshift(data);
      this.getGenFolders();
      this.folderCreate = new Folder();
    })
  }

  getGenFolders() {
    this.folderService.getGen().subscribe((data: any) => {
      this.folders = data;
      if (this.folders.length > 0) {
        this.folder = this.folders[0];
        this.getImagesByGenId(this.folders[0].id);
      }
    })
  }

  getImagesByGenId(genid: number) {
    this.imageService.getImageByDesId(genid).subscribe((data: any) => {
      this.images = data;
    })
  }

  getImagesByDe(event: any){
    console.log(event);
    console.log(this.folder);
    
  }

  copyLink(item: FolderImage){
    navigator.clipboard.writeText(`${this.urlImg}General/${item.folderName}/${item.imageName}`);
    this.showNoti('Đã copy!')
  }

  /**
   * Hàm bắn event cho child khi lựa chọn 1 item
   *
   * @param {FolderImage} item
   * @memberof ImageGeneralComponent
   */
  select(item: FolderImage){
    this.selectedItem.emit(`${this.urlImg}General/${item.folderName}/${item.imageName}`);
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



}
