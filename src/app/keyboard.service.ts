import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeyboardService {
  private keyboardStatus = new BehaviorSubject<boolean>(false);

  // Observable to track the keyboard status
  keyboardStatus$ = this.keyboardStatus.asObservable();

  // Method to update the keyboard status
  setKeyboardStatus(status: boolean) {
    this.keyboardStatus.next(status);
  }
  constructor() { }
}
