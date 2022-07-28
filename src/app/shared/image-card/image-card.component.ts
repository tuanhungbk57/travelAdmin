import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss']
})
export class ImageCardComponent implements OnInit {

  @Input() path: string = "";
  @Input() imgURL: string = "";
  @Input() btnContent: string = "";
  @Input() id: number = -1;

  @Output() editData = new EventEmitter<any>();
  @Output() deleteData = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  editClick(){
    this.editData.emit(this.id);
  }

  deleteClick(){
    this.deleteData.emit(this.id);
  }

}
