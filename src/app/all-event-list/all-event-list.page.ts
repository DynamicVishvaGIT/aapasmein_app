import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { AddeventPage } from '../addevent/addevent.page';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-all-event-list',
  templateUrl: './all-event-list.page.html',
  styleUrls: ['./all-event-list.page.scss'],
})
export class AllEventListPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  currentUser:any;
  list:any=[{category_name:'',category_id:'',events:[]}];
  myEventList:any=[{category_name:'',category_id:'',events:[]}];
  myInterestList:any=[{category_name:'',category_id:'',events:[]}];
  info = 'allevent';
  searchFlag=false;
  category_id:string='';
  imageUrl = 'https://aapasmein.dvadminpanel.in';
  urlType:string='';
  routeURL:string = '';

  constructor(private router: Router, private modalCtrl: ModalController, private apiService: ApiService, private commonService: CommonService,
    private activatedRoute: ActivatedRoute) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.category_id = params['category_id'];
      this.urlType = params['urlType'];
      this.routeURL = params['routeURL'];
      console.log(this.category_id);
      console.log(this.urlType);
      if(this.urlType=='all'){
        this.info='allevent';
      }
      else if(this.urlType=='myevent'){
        this.info='myevent';
      }
      else{
        this.info='myinterest';
      }
    });
    let currentUser:any;
    currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(currentUser);
    console.log(this.currentUser);
    this.load_events();
    this.load_my_events();
    this.load_my_interested_events();
  }

  load_events() {
    // let formData = new FormData();
    // formData.append("mobile_no",this.currentUser.mobile_no),
    // formData.append("Category_id",this.category_id),
    // formData.append('apptype',this.apiService.apptype),
    this.apiService.load_events(this.currentUser.mobile_no,this.category_id)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      // this.list = response.data[0].events;
      let index = this.commonService.findItem(response.data,'category_id',this.category_id);
      if(index!=-1){
        this.list = response.data[index].events;
      }
    },
    respError => {
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  load_my_events() {
    // let formData = new FormData();
    // formData.append("user_id",this.currentUser.user_id),
    // formData.append('apptype',this.apiService.apptype),
    this.apiService.load_events(this.currentUser.user_id)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      let index = this.commonService.findItem(response.data,'category_id',this.category_id);
      if(index!=-1){
        this.myEventList = response.data[index].events;
      }
    },
    respError => {
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  load_my_interested_events() {
    let formData = new FormData();
    formData.append("user_id",this.currentUser.user_id),
    this.apiService.load_my_interested_events(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      // this.myInterestList = response.data[0].events;
      let index = this.commonService.findItem(response.data,'category_id',this.category_id);
      if(index!=-1){
        this.myInterestList = response.data[index].events;
      }
    },
    respError => {
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  showSearch() {
    this.searchFlag = !this.searchFlag;
  }

  goToDetails(data:any, type:string) {
    this.router.navigate(['/event-details'],{ queryParams: {event_id: data.id, type: type, url: 'eventlist'}});
  }

  // addEvent() {
  //   this.router.navigate(['/addevent']);
  // }
  dismiss() {
    if(this.routeURL=='features'){
      this.router.navigate(['/aapasmein-features']);
    }
    else{
      this.router.navigate(['/event-category']);
    }
  }
  
  async addEvent() {
    let modal = await this.modalCtrl.create({ component: AddeventPage});
    modal.onDidDismiss().then((modalItem) => {
      if (modalItem) {
        
      }
    })
    return await modal.present();
  }

}
