import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as nth from 'src/app/common/util'
import { CountryLang } from '../model/country-lang';
@Component({
  selector: 'app-lang',
  templateUrl: './lang.component.html',
  styleUrls: ['./lang.component.scss']
})
export class LangComponent implements OnInit {
  @Input() lang: string = "";
  @Input() title: string = "";
  @Output() public changedItem = new EventEmitter();

  countries = nth.langs;
  country: CountryLang = new CountryLang();
  constructor() { }


  ngOnInit(): void {
    if (this.lang) {
      for (let index = 0; index < this.countries.length; index++) {
        const country = this.countries[index];
        if (country.key == this.lang) {
          this.country = country;
          break;
        }
      }
    } else {
      if (this.getCurrentLang())
        this.country = this.getCurrentLang();
        else
        this.country = this.countries[0];
    }
  }

  changedLanguage(data: CountryLang) {
    this.changedItem.emit(data);
    localStorage.setItem('lang', data.key);

  }
  getCurrentLang(): CountryLang {
    const lang = localStorage.getItem('lang');
    const langObj = nth.langs.filter((item: CountryLang) => {
      return item.key == lang;
    })[0];
    return langObj;
  }

}
