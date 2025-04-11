import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';
import { ShareModalPage } from '../share-modal/share-modal.page';
import { ReportReasonPage } from '../report-reason/report-reason.page';

@Component({
  selector: 'app-broadcast-details',
  templateUrl: './broadcast-details.page.html',
  styleUrls: ['./broadcast-details.page.scss'],
})
export class BroadcastDetailsPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  currentUser:any;
  searchFlag=false;
  broadcast_id:string='';
  broadcast_details:any={CREATED_DATE:'',TITLE:'',USER__NAME:'',USER__PROFILE_IMAGE:'',DESCRIPTION:''};
  bookmarkFlag:boolean = false;
  broadcastListStatus = '';
  imageUrl = 'https://aapasmein.dvadminpanel.in/media/';
  urlType:string='';

  constructor(private router: Router, private commonService: CommonService, private modalCtrl: ModalController, private activatedRoute: ActivatedRoute,
    private apiService: ApiService, private alertCtrl: AlertController) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.broadcast_id = params['broadcast_id'];
      this.urlType = params['url'];
    });
    let currentUser:any;
    currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(currentUser);
    console.log(this.currentUser);
    this.get_broadcast_details();
  }

  doRefresh(event:any){
    setTimeout(() => {
      // Any calls to load data go here
      this.get_broadcast_details();
      event.target.complete();
    }, 100);
  }

  get_broadcast_details() {
    let formData = new FormData();
    formData.append('user_id',this.currentUser.user_id);
    formData.append("apptype",this.apiService.apptype),
    this.apiService.get_broadcast_details(this.broadcast_id, formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.broadcast_details = response.data.broadcast_details[0];
      this.broadcastListStatus= response.data.broadcast_status;
      if(this.broadcastListStatus=='saved' || this.broadcastListStatus!=null){
        this.bookmarkFlag = false;
      }
      else{
        this.bookmarkFlag = true;
      }
    },
    respError => {
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  async showBookmarkDialog(status:string) {
    let showStatus='';
    let what = '';
    if(status=='saved'){
      showStatus = 'save';
      what = 'to';
    }
    else{
      showStatus = 'remove';
      what = 'from';
    }
    const confirm = await this.alertCtrl.create({
      header: showStatus=='remove'?'Remove':'Save'+' '+what+' saved broadcast',
      message: 'Do you want to '+showStatus+' this broadcast '+what+' saved broadcast?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Ok, '+showStatus+' it',
          handler: () => {
            this.save_broadcast(status);
          }
        }
      ]
    });
   await  confirm.present();
  }

  showSearch() {
    this.searchFlag=!this.searchFlag;
  }

  dismiss() {
    if(this.urlType=='broadcastlist'){
      this.router.navigate(['/broadcast-list']);
    }
    else{
      this.router.navigate(['/saved-items-list']);
    }
  }

  save_broadcast(status:string) {
    let formData = new FormData();
    formData.append('user_id',this.currentUser.user_id);
    formData.append('broadcast_id',this.broadcast_id);
    formData.append('status',status);
    this.apiService.save_broadcast(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
        console.log(response);
        this.bookmarkFlag=!this.bookmarkFlag;
        this.commonService.showToastMessage(response.message, 'success-toast','', 2000);
      },
      respError => {
        this.commonService.showToastMessage(respError, 'error-toast','', 4000);
      })
    // this.commonService.showToastMessage('Bookmark has been saved to saved items.', 'success-toast','', 5000);
  }

  async goToReport() {
    const modal = await this.modalCtrl.create({
      component: ReportReasonPage,
      componentProps:{routeURL: 'broadcastdetails', id: this.broadcast_details.id },
      // breakpoints: [0, 0.3, 0.5, 0.8],
      // initialBreakpoint: 0.6,
      // cssClass: 'custom-modal'
    });
    modal.onDidDismiss().then((modalItem) => {
      if (modalItem) {
        console.log(modalItem);
        if(modalItem.data!==undefined){
          
        }
        else{
        }
      }
    })
    return await modal.present();
  }

  async shareDetails(broadcast_id:string) {
    let modal = await this.modalCtrl.create({ component: ShareModalPage, componentProps:{broadcast_id: broadcast_id }});
    modal.onDidDismiss().then((modalItem) => {
      if (modalItem) {
        
      }
    })
    return await modal.present();
  }

}
