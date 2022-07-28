import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransshipmentService {

  constructor() { }
  private message = new BehaviorSubject('nth');
  currentMessage = this.message.asObservable();
  updateMessage(message: string){
    this.message.next(message);
  }
}
