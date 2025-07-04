import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-settingmodal',
  templateUrl: './settingmodal.page.html',
  styleUrls: ['./settingmodal.page.scss'],
})
export class SettingmodalPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  currentUser:any;

  constructor(private modalCtrl: ModalController, private router: Router, private apiService: ApiService,private commonService: CommonService ) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    let currentUser:any;
    currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(currentUser);
    console.log(this.currentUser);
  }

  logoutMyDevice() {
    let formData = new FormData();
    formData.append('user_id',this.currentUser.user_id);
    formData.append('apptype','mobile');
    formData.append('logout_type', 'single');
    formData.append('session_id', this.currentUser.session_id);
    this.apiService.logout(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.logout();
    },
    respError => {
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  logout() {
    this.dismiss();
    localStorage.removeItem('currentUser');
    localStorage.clear();  // Clear all local storage data
    sessionStorage.clear(); // Clear session storage
    this.router.navigate(['/welcome']);
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
