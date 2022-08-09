import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as nth from 'src/app/common/util'
import notify from 'devextreme/ui/notify';
import { CountryLang } from 'src/app/shared/model/country-lang';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  domain: string = nth.urlAPI
  constructor(public http: HttpClient) { }

  showNoti(message: string, type: string = "success") {
    let position : object = {
      top: 100,
      bottom: undefined,
      left: undefined,
      right: 50,
    };
    notify({
      message: message,
      height: 'auto',
      minHeight: 100,
      width: 'auto',
      minWidth: 150,
      type: type,
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

  getCurrentLang(): CountryLang{
    const lang = localStorage.getItem('lang');
    if(!lang){
      localStorage.setItem('lang',nth.langs[1].key);
      return nth.langs[1].key;
    }
    const langObj = nth.langs.filter((item: CountryLang) =>{
      return item.key == lang;
    })[0];
    
    return langObj;
  }
}
