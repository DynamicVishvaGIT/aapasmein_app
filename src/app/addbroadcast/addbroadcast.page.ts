import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-addbroadcast',
  templateUrl: './addbroadcast.page.html',
  styleUrls: ['./addbroadcast.page.scss'],
})
export class AddbroadcastPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  selectedRadio:string='public';
  acceptTerms:boolean=false;
  currentUser:any;
  broadcastJson:any={title:'',description:'', share_with:'public'};
  disabled:boolean=false;

  constructor(private modalCtrl: ModalController, private apiService: ApiService, private commonService: CommonService, private router: Router) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    let currentUser:any;
    currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(currentUser);
    console.log(this.currentUser);
  }

  async add_broadcast() {
    if (this.broadcastJson.title == '') {
      this.commonService.showToastMessage('Please enter title.', 'error-toast', 'top', 2000);
      return;
    }
    if (this.broadcastJson.description == '') {
      this.commonService.showToastMessage('Please enter descriptiopn.', 'error-toast', 'top', 2000);
      return;
    }
    console.log(this.broadcastJson);
    this.disabled = true;
    let formData = new FormData();
    formData.append("title",this.broadcastJson.title),
    formData.append("description",this.broadcastJson.description),
    formData.append("share_with",this.broadcastJson.share_with),
    formData.append("user_id",this.currentUser.user_id),
    formData.append("apptype",this.apiService.apptype),
    console.log(this.broadcastJson);
    this.apiService.add_broadcast(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
        console.log(response);
        this.disabled = false;
        this.commonService.showToastMessage(response.message, 'success-toast','', 2000);
        this.dismiss();
        this.router.navigate(['/broadcast-list']);
      },
      respError => {
        this.disabled = false;
        this.commonService.showToastMessage(respError, 'error-toast','', 2000);
      })
  }

  onRadioSelect(value: string) {
    this.broadcastJson.share_with = value;
    console.log(this.broadcastJson.share_with);
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
