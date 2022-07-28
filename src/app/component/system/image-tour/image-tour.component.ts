import { Component, OnInit } from '@angular/core';
import { Folder } from '../model/folder';
import { FolderImage } from '../model/folder-image';
import { FolderService } from '../service/folder.service';
import { ImageService } from '../service/image.service';
import * as nth from 'src/app/common/util'

@Component({
  selector: 'app-image-tour',
  templateUrl: './image-tour.component.html',
  styleUrls: ['./image-tour.component.scss']
})
export class ImageTourComponent implements OnInit {

  constructor(public folderService: FolderService, public imageService: ImageService) { }
  folderCreate: Folder = new Folder();
  desFolder: Folder = new Folder();
  desFolders: Folder[] = [];
  tripFolder: Folder = new Folder();
  tripFolders: Folder[] = [];
  images: FolderImage[] = [];
  urlImg = nth.urlImg;

  ngOnInit(): void {
  }

}
