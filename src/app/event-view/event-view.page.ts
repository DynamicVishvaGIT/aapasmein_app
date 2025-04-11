import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { AddeventPage } from '../addevent/addevent.page';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.page.html',
  styleUrls: ['./event-view.page.scss'],
})
export class EventViewPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  currentUser:any;
  list:any=[{category_name:'',category_id:'',events:[]}];
  searchFlag=false;
  category_id:string='';
  category_name:string='';
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
      this.category_name = params['category_name'];
      this.urlType = params['urlType'];
      this.routeURL = params['routeURL'];
      console.log(this.category_id);
      console.log(this.urlType);
    });
    let currentUser:any;
    currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(currentUser);
    console.log(this.currentUser);
    this.load_events();
  }

  doRefresh(event:any){
    setTimeout(() => {
      // Any calls to load data go here
      this.load_events();
      event.target.complete();
    }, 100);
  }

  load_events() {
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

  showSearch() {
    this.searchFlag = !this.searchFlag;
  }

  goToDetails(data:any, type:string) {
    this.commonService.currentPage = '/event-details';
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
