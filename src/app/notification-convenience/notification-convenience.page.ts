import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-notification-convenience',
  templateUrl: './notification-convenience.page.html',
  styleUrls: ['./notification-convenience.page.scss'],
})
export class NotificationConveniencePage implements OnInit {

  private _unsubscribeAll: Subject<any>;
  
  currentUser:any;
  @Input() data: any;
  imageUrl = 'https://aapasmein.dvadminpanel.in/media/';
  notification_data: any;

  constructor(private modalCtrl: ModalController, private apiService: ApiService, private commonService: CommonService) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    let currentUser:any;
    currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(currentUser);
    console.log(this.data);
    this.load_convenience_for_notification();
  }

  load_convenience_for_notification() {
    this.commonService.presentLoading();
    this.apiService.load_convenience_for_notification(this.currentUser.user_id,this.data.MOBILE_NO)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.notification_data = response.data[0];
      this.commonService.dismissLoading();
    },
    respError => {
      this.commonService.dismissLoading();
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  approve_convenience(type:string) {
    this.apiService.approve_convenience(this.data.id,type)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      if(response.checkin=='accepted'){
        // notification.USER_APPROVED = true;
        // notification.accept_text = 'Accepted';
        this.modalCtrl.dismiss({ action: 'Accepted', data: this.data });
      }
      else{
        // notification.USER_APPROVED = true;
        // notification.reject_text = 'Rejected';
        this.modalCtrl.dismiss({ action: 'Rejected', data: this.data });
        // const index = this.categorizedData[categoryKey].indexOf(notification);
        // if (index > -1) {
        //   this.categorizedData[categoryKey].splice(index, 1);
        // }
      }
      this.commonService.showToastMessage(response.message, 'success-toast','', 2000);
    },
    respError => {
      this.commonService.dismissLoading();
      console.log(respError);
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  close() {
    this.modalCtrl.dismiss();
  }
  
  accept() {
    this.modalCtrl.dismiss({ action: 'accepted', data: this.data });
  }
  
  reject() {
    this.modalCtrl.dismiss({ action: 'rejected', data: this.data });
  }

}
