import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-add-community',
  templateUrl: './add-community.page.html',
  styleUrls: ['./add-community.page.scss'],
})
export class AddCommunityPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  currentUser:any;
  communityJson:any={title:'',description:''};
  disabled=false;

  constructor(private modalCtrl: ModalController, private commonService: CommonService, private apiService: ApiService, private router: Router) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    let currentUser:any;
    currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(currentUser);
    console.log(this.currentUser);
  }

  async add_community() {
    if (this.communityJson.title == '') {
      this.commonService.showToastMessage('Please enter title.', 'error-toast', 'top', 2000);
      return;
    }
    if (this.communityJson.description == '') {
      this.commonService.showToastMessage('Please enter the description.', 'error-toast', 'top', 2000);
      return;
    }
    this.disabled = true;
    let formData = new FormData();
    formData.append("title",this.communityJson.title),
    formData.append("description",this.communityJson.description),
    formData.append("user_id",this.currentUser.user_id),
    formData.append("apptype",this.apiService.apptype),
    console.log(this.communityJson);
    this.apiService.add_community(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
        console.log(response);
        this.disabled = false;
        this.commonService.showToastMessage(response.message, 'success-toast','', 2000);
        this.closeModal();
        this.router.navigate(['/community-list']);
      },
      respError => {
        this.disabled = false;
        console.log(respError)
        this.commonService.showToastMessage(respError, 'error-toast','', 2000);
      })
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
