import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeyboardService } from '../keyboard.service';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-send-handshake',
  templateUrl: './send-handshake.page.html',
  styleUrls: ['./send-handshake.page.scss'],
})
export class SendHandshakePage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  currentUser:any;
  friend:any={mobile_no:''};
  get_locations:any = [];
  inputFocused:boolean=false;
  handshake_data:any=[];
  imageUrl = 'https://aapasmein.dvadminpanel.in/media/';


  constructor(private router: Router, private keyboardService: KeyboardService, private apiService: ApiService, private commonService: CommonService) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    let currentUser:any;
    currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(currentUser);
    console.log(this.currentUser);
  }

  verify() {
    if(this.friend.mobile_no == '') {
      this.commonService.showToastMessage('Please enter mobile number.', 'error-toast', 'top', 2000);
      return;
    }
    this.apiService.get_handshake(this.friend.mobile_no,'handshake','')
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.handshake_data = response;
    },
    respError => {
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  onFocus() {
    // Notify the service that the keyboard is open
    this.keyboardService.setKeyboardStatus(true);
  }

  onBlur() {
    // Notify the service that the keyboard is closed
    this.keyboardService.setKeyboardStatus(false);
  }

  add_handshake() {
    let formData = new FormData();
    formData.append('user_id',this.currentUser.user_id);
    formData.append('mobile_no',this.friend.mobile_no);
    this.apiService.add_handshake(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.commonService.showToastMessage(response.message, 'success-toast','', 4000);
      this.router.navigate(['/dashboard']);
    },
    respError => {
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  back() {
    // this.modalCtrl.dismiss();
    this.router.navigate(['/dashboard']);
  }

}
