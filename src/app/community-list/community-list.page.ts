import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { AddCommunityPage } from '../add-community/add-community.page';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-community-list',
  templateUrl: './community-list.page.html',
  styleUrls: ['./community-list.page.scss'],
})
export class CommunityListPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  currentUser:any;
  community_list:any=[];
  searchFlag = false;
  imageUrl = 'https://aapasmein.dvadminpanel.in/media/';
  routeURL:string = '';

  constructor(private router: Router, private modalCtrl: ModalController, private apiService: ApiService, private commonService: CommonService, private activatedRoute: ActivatedRoute) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    let currentUser:any;
    currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(currentUser);
    console.log(this.currentUser);
    this.activatedRoute.queryParams.subscribe(params => {
      this.routeURL = params['routeURL'];
      console.log(this.routeURL);
    });
    this.load_Community();
  }

  load_Community() {
    this.commonService.presentLoading();
    // let formData = new FormData();
    // formData.append('mobile_no',this.currentUser.mobile_no);
    this.apiService.load_Community()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.community_list = response.data;
      this.commonService.dismissLoading();
    },
    respError => {
      this.commonService.dismissLoading();
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  showSearch() {
    this.searchFlag =!this.searchFlag;
  }

  goToCommunityChatbox(data:any) {
    this.router.navigate(['/community-chatbox'], { queryParams: { community_id: data.id} });
  }

  async addCommunityPage() {
    // this.router.navigate(['/add-convenience']);
    const modal = await this.modalCtrl.create({
      component: AddCommunityPage,
      breakpoints: [0, 0.3, 0.5, 0.8],
      initialBreakpoint: 0.8,
      cssClass: 'custom-modal'
    });
    modal.onDidDismiss().then((modalItem) => {
      if (modalItem) {
        console.log(modalItem);
        if(modalItem.data!=undefined){
          
        }
      }
    })
    return await modal.present();
  }

  dismiss() {
    if(this.routeURL=='features'){
      this.router.navigate(['/aapasmein-features']);
    }
    else{
      this.router.navigate(['/dashboard']);
    }
  }

}
