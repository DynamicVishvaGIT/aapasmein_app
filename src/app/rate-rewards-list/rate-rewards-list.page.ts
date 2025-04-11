import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { AddRateRewardsPage } from '../add-rate-rewards/add-rate-rewards.page';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-rate-rewards-list',
  templateUrl: './rate-rewards-list.page.html',
  styleUrls: ['./rate-rewards-list.page.scss'],
})
export class RateRewardsListPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  currentUser:any;
  searchFlag = false;
  routeURL:string='';
  recognition_data:any=[];
  imageUrl = 'https://aapasmein.dvadminpanel.in/media/';
  isFooterVisible: boolean = true;
  filteredList: any[] = [];
  dataLoaded: boolean = false;
  searchQuery: string = '';

  constructor(private router: Router, private modalCtrl: ModalController, private alertCtrl: AlertController, private activatedRoute: ActivatedRoute,
    private apiService: ApiService, private commonService: CommonService
  ) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    let currentUser:any;
    currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(currentUser);
    console.log(this.currentUser);
    this.activatedRoute.queryParams.subscribe(params => {
      this.routeURL = params['routeURL'];
    });
    this.load_recognition();
  }

  doRefresh(event:any){
    setTimeout(() => {
      // Any calls to load data go here
      this.load_recognition();
      event.target.complete();
    }, 100);
  }

  load_recognition() {
    this.commonService.presentLoading();
    this.apiService.load_recognition(this.currentUser.mobile_no)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.recognition_data = response;
      this.filteredList = [...this.recognition_data]; // Initialize filtered list
      this.isFooterVisible = true;
      this.dataLoaded = true;
      this.commonService.dismissLoading();
    },
    respError => {
      this.commonService.dismissLoading();
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  filterList() {
    const query = this.searchQuery.toLowerCase();
    if (query.trim() === '') {
      this.filteredList = [...this.recognition_data]; // Reset when search is empty
      this.isFooterVisible = true;
    } else {
      this.filteredList = this.recognition_data.filter((item:any) => 
        item.NAME.toLowerCase().includes(query)
      );
      this.isFooterVisible = true;
    }
  }

  hideFooter() {
    this.isFooterVisible = false;
  }

  showSearch() {
    this.searchFlag = !this.searchFlag;
  }

  async addRateRewardsPage(id:string) {
    const modal = await this.modalCtrl.create({
      component: AddRateRewardsPage,
      componentProps:{ratee: id },
      // breakpoints: [0, 0.3, 0.5, 0.8],
      // initialBreakpoint: 0.9,
      // cssClass: 'custom-modal'
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

  async showRateDialog() {
    const confirm = await this.alertCtrl.create({
      // header: 'Delete Scheme',
      cssClass: 'custom-alert',
      message: 'Have you work with this person?',
      buttons: [
        {
          text: 'No',
          cssClass: 'no-button',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          cssClass: 'yes-button',
          handler: () => {
            // this.addRateRewardsPage();
          }
        }
      ]
    });
   await  confirm.present();
  }

  add_handshake(data:any) {
    let formData = new FormData();
    formData.append('user_id',this.currentUser.user_id);
    formData.append('mobile_no',data.MOBILE_NO);
    this.apiService.add_handshake(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.commonService.showToastMessage(response.message, 'success-toast','', 4000);
    },
    respError => {
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  // goToHandshake() {
  //   this.router.navigate(['/send-handshake']);
  // }

  dismiss() {
    if(this.routeURL=='features'){
      this.router.navigate(['/aapasmein-features']);
    }
    else{
      this.router.navigate(['/dashboard']);
    }
  }

}
