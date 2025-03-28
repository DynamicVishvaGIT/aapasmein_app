import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';
import { ModalController } from '@ionic/angular';
import { ReportReasonPage } from '../report-reason/report-reason.page';
import { ViewImagePage } from '../view-image/view-image.page';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  currentUser:any;
  searchFlag = false;
  imageUrl = 'https://aapasmein.dvadminpanel.in/media/';
  event_id:string='';
  type:string='';
  url:string='';
  searchText:string='';
  event_details:any={USER__NAME:'',USER__PROFILE_IMAGE:'',EVENT_NAME:'',EVENT_IMAGE:'',LOCATION:'',DESCRIPTION:'',DATE:''};

  constructor(private router: Router, private apiService: ApiService, private commonService: CommonService, private activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController
  ) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.event_id = params['event_id'];
      this.type = params['type'];
      this.url = params['url'];
      console.log(this.event_id);
      this.searchText = params['searchText'];
    });
    let currentUser:any;
    currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(currentUser);
    console.log(this.currentUser);
    this.get_event_details();
  }

  get_event_details() {
    let formData = new FormData();
    formData.append("user_id",this.currentUser.user_id),
    formData.append("event_type",this.type=='all'?'allevent':'myevent'),
    this.apiService.get_event_details(this.event_id, formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.event_details = response.event_list[0];
      console.log(this.event_details);
    },
    respError => {
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  add_interested_event() {
    let formData = new FormData();
    formData.append("user_id",this.currentUser.user_id),
    formData.append("event_id",this.event_details.id),
    formData.append("status",this.event_details.interested_Status==false?'on':'off'),
    this.apiService.add_interested_event(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.commonService.showToastMessage(response.message, 'success-toast','', 2000);
      if(this.event_details.interested_Status==false){
        this.event_details.interested_Status = true;
      }
      else{
        this.event_details.interested_Status = false;
      }
    },
    respError => {
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  showSearch() {
    this.searchFlag = !this.searchFlag;
  }

  async goToReport() {
    const modal = await this.modalCtrl.create({
      component: ReportReasonPage,
      componentProps:{routeURL: 'eventdetails', id: this.event_details.id },
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

  async zoomImage(image:string) {
    console.log(image);
    let modal = await this.modalCtrl.create({component:ViewImagePage, componentProps:{ imageUrl: 'https://aapasmein.dvadminpanel.in/media/'+image }});
    //modal.present();
    modal.onDidDismiss().then((modalItem) => {
      if (modalItem) {console.log(modalItem);
      }
    })
    return await modal.present();
  }

  dismiss() {
    if(this.url=='categorylist'){
      this.router.navigate(['/event-category']);
    }
    else if(this.url=='search'){
      this.router.navigate(['/globalsearchdetails'], { queryParams: { searchText: this.searchText} });
    }
    else if(this.url=='dashboard'){
      this.router.navigate(['/dashboard']);
    }
    else{
      this.router.navigate(['/event-view'], { queryParams: { urlType: this.type}});
    }
  }

}
