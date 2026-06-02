import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CommonService } from '../common.service';
import { ApiService } from '../api.service';
import { Platform } from '@ionic/angular';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';

@Component({
  selector: 'app-interested-user-list',
  templateUrl: './interested-user-list.page.html',
  styleUrls: ['./interested-user-list.page.scss'],
})
export class InterestedUserListPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  currentUser:any;
  event_id:string='';
  dataLoaded:boolean = false;
  list_data:any=[];
  filteredList:any=[];
  isFooterVisible: boolean = true;
  searchQuery: string = '';
  imageUrl = 'https://aapasmein.dvadminpanel.in/media/';
  routeURL:string='';
  type: string = '';

  constructor(private activatedRoute: ActivatedRoute, private commonService: CommonService, private apiService: ApiService, private router: Router,
    private callNumber: CallNumber, private platform: Platform
  ) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    let currentUser:any;
    currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(currentUser);
    console.log(this.currentUser);
    this.activatedRoute.queryParams.subscribe(params => {
      this.event_id = params['event_id'];
      console.log(this.event_id);
      this.routeURL = params['routeURL'];
      this.type = params['type'];
      this.get_interested_event_peoples();
    });
  }

  get_interested_event_peoples() {
    this.commonService.presentLoading();
    this.dataLoaded = false; 
    this.apiService.get_interested_event_peoples(this.event_id)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
        console.log(response);
        this.list_data = response.data;
        this.filteredList = [...this.list_data]; // Initialize filtered list
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
      this.filteredList = [...this.list_data]; // Reset when search is empty
      this.isFooterVisible = true;
    } 
    else {
      this.filteredList = this.list_data.filter((item:any) => 
        item.INTERESTED_USER__NAME.toLowerCase().includes(query)
      );
      this.isFooterVisible = true;
    }
  }

  hideFooter() {
    this.isFooterVisible = false;
  }

  doRefresh(event:any){
    setTimeout(() => {
      // Any calls to load data go here
      this.get_interested_event_peoples();
      event.target.complete();
    }, 100);
  }

  makeCall(phoneNumber: string) {
    this.platform.ready().then(() => {
      this.callNumber.callNumber(phoneNumber, true)
        .then(res => console.log('Dialing succeeded!', res))
        .catch(err => console.log('Dialing failed', err));
    });
  }

  dismiss() {
    this.commonService.currentPage = '/event-details';
    this.router.navigate(['/event-details'], { queryParams: { event_id: this.event_id, type: this.type, url: this.routeURL} });
    // if(this.routeURL=='mymall'){
    //   this.router.navigate(['/my-mall']);
    // }
    // else{
    //   this.commonService.currentPage = '/mall-details';
    //   this.router.navigate(['/request-send'], { queryParams: { mall_id: this.event_id, routeURL: this.routeURL} });
    // }
  }

}
