import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Folder } from '../model/folder';
import { FolderImage } from '../model/folder-image';
import { FolderService } from '../service/folder.service';
import { ImageService } from '../service/image.service';
import * as nth from 'src/app/common/util'
import { TransshipmentService } from 'src/app/core/service/transshipment.service';

@Component({
  selector: 'app-image-trip',
  templateUrl: './image-trip.component.html',
  styleUrls: ['./image-trip.component.scss']
})
export class ImageTripComponent implements OnInit {

  constructor(public folderService: FolderService, public imageService: ImageService, public transshipmentService: TransshipmentService) { }
  folderCreate: Folder = new Folder();
  desFolder: Folder = new Folder();
  desFolders: Folder[] = [];
  tripFolder: Folder = new Folder();
  tripFolders: Folder[] = [];
  images: FolderImage[] = [];
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

  ngOnInit(): void {
    this.getDesFolders();
    if(this.isMain){
      this.transshipmentService.updateMessage("Quản lý ảnh các chuyến đi");
    }
  }
  createFolder(event: any) {
    this.folderCreate.parentId = this.desFolder.id;
    this.folderCreate.type = 1;
    this.folderService.createTrip(this.folderCreate).subscribe((data: any) => {
      this.tripFolders.unshift(data);
      this.folderCreate = new Folder();
    })
  }

  
  /**
   * Lấy danh sách Desfolder, sau đó lấy tiếp tripfolder theo current Des
   *
   * @memberof ImageTripComponent
   */
  getDesFolders() {
    this.folderService.getDes().subscribe((data: any) => {
      this.desFolders = data;
      if (this.desFolders.length > 0) {
        this.desFolder = this.desFolders[0];
        this.getTripFolderByDesId(this.desFolders[0].id);
      }
    })
  }



  /**
   * Lấy ảnh theo tripId
   *
   * @param {number} tripId
   * @memberof ImageTripComponent
   */
  getImagesByTripId(tripId: number) {
    this.imageService.getImageByTripId(this.desFolder.id, tripId).subscribe((data: any) => {
      this.images = data;
    })
  }
  

  /**
   * Lấy folder Trip theo DesId
   *
   * @param {number} desId id điểm đến
   * @memberof ImageTripComponent
   */
   getTripFolderByDesId(desId: number){
      this.folderService.getTrip(desId).subscribe((data:any) =>{
        this.tripFolders = data;
      })
  }
  copyLink(item: FolderImage){
    navigator.clipboard.writeText(`${this.urlImg}Trip/${item.folderName}/${item.imageName}`);
  }

  /**
   * Hàm bắn event cho child khi lựa chọn 1 item
   *
   * @param {FolderImage} item
   * @memberof ImageTripComponent
   */
   select(item: FolderImage){
    this.selectedItem.emit(`${this.urlImg}Trip/${item.folderName}/${item.imageName}`);
  }

}
