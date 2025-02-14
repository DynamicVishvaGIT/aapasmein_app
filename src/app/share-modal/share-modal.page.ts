import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-share-modal',
  templateUrl: './share-modal.page.html',
  styleUrls: ['./share-modal.page.scss'],
})
export class ShareModalPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  @Input() broadcast_id!: string;

  selectedRadio:string='public';
  acceptTerms:boolean=false;
  currentUser:any;
  broadcastJson:any={share_with:'public'};
  disabled:boolean=false;

  constructor(private modalCtrl: ModalController, private apiService: ApiService, private commonService: CommonService) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    let currentUser:any;
    currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(currentUser);
    console.log(this.currentUser);
    console.log(this.broadcast_id);
  }

  async share_broadcast() {
    console.log(this.broadcastJson);
    this.disabled = true;
    let formData = new FormData();
    formData.append("share_with",this.broadcastJson.share_with),
    formData.append("user_id",this.currentUser.user_id),
    formData.append('broadcast_id', this.broadcast_id)
    console.log(this.broadcastJson);
    this.apiService.share_broadcast(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
        console.log(response);
        this.disabled = false;
        this.commonService.showToastMessage(response.message, 'success-toast','', 2000);
        this.dismiss();
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
