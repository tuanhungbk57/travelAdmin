import { Component, OnInit } from '@angular/core';
import { CountryLang } from 'src/app/shared/model/country-lang';
import { Footer, Link } from '../model/footer';
import { FooterService } from '../service/footer.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  currentLang: string = this.footerService.getCurrentLang()?.key;

  column4: Link[] = [];
  link: Link = new Link();
  footer: Footer = new Footer();
  column2: Link[] = []
  constructor(public footerService: FooterService) { }

  ngOnInit(): void {
    this.getByFooterByLang(this.currentLang);
  }

  addNewLinkToColumn2() {
    let obj = new Link()
    this.column2.push(obj);
  }

  removeElementFromColumn2(object: any) {
    this.column2.forEach((value, index) => {
      if (value.label == object.label) this.column2.splice(index, 1);
    });
  }

  addNewLinkToColumn4() {
    let obj = new Link()
    this.column4.push(obj);
  }

  removeElementFromColumn4(object: any) {
    this.column4.forEach((value, index) => {
      if (value.label == object.label) this.column4.splice(index, 1);
    });
  }

  getFooterByLang(lang: CountryLang){
    this.currentLang = lang.key;
  }

  create() {

    this.footer.lang = this.currentLang;
    this.footer.column2 = JSON.stringify(this.column2);
    this.footer.column4 = JSON.stringify(this.column4);
    if (!this.footer.id) {
      this.footerService.create(this.footer).subscribe((data: any) => {
        this.footerService.showNoti("Tạo mới thành công");
        this.footer.id = data.id;
      })
    } else {
      this.footerService.edit(this.footer).subscribe((data: any) => {
        this.footerService.showNoti("Cập nhật thành công")
      })
    }


  }

  
  /**
   * Sự kiện thay đổi ngôn ngữ
   *
   * @param {CountryLang} lang
   * @memberof TourDetailComponent
   */
   changedLanguage(lang: CountryLang) {
    this.currentLang = lang.key;
    this.getByFooterByLang( lang.key);
  }

  /**
   * Lấy về tour detail theo master
   *
   * @param {number} tourId
   * @param {string} lang
   * @memberof TourDetailComponent
   */
   getByFooterByLang( lang: string) {
    this.footerService.getByFooterByLang(lang).subscribe((data: any) => {
    if(data){
      this.footer = data;
      this.column2 = JSON.parse(this.footer.column2);
      this.column4 = JSON.parse(this.footer.column4);
    }else{
      this.footer = new Footer();
    }
    })
  }

}
