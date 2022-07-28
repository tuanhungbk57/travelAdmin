import { Component, Input, OnInit } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { Folder } from '../../model/folder';
import { FolderService } from '../../service/folder.service';
@Component({
  selector: 'app-foler-popup',
  templateUrl: './foler-popup.component.html',
  styleUrls: ['./foler-popup.component.scss']
})
export class FolerPopupComponent implements OnInit {
  @Input() popupVisible: boolean = false;
  createFolderOptions: any;
  folder: Folder = new Folder();
  constructor(public folderService: FolderService) {
    this.createFolderOptions = {
      text: 'Tạo mới',
      
      onClick(e: any) {
        const  message = "Tạo mới thành công";
        
        this.folderService.createDestination(this.folder)
        notify({
          message,
          position: {
            my: 'center top',
            at: 'center top',
          },
        }, 'success', 2000);
      },
    }

   }

  ngOnInit(): void {
  }

}
