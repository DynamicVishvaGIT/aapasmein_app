import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { Platform } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-convenience-details',
  templateUrl: './convenience-details.page.html',
  styleUrls: ['./convenience-details.page.scss'],
})
export class ConvenienceDetailsPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  url:string='';
  profession:string='';
  searchFlag=false;
  currentUser:any;
  list:any=[];
  convenience_id:string='';
  dataLoaded:boolean=false;
  searchQuery: string = '';
  filteredList: any[] = [];
  isFooterVisible: boolean = true;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private callNumber: CallNumber, private platform: Platform,
    private apiService: ApiService, private commonService: CommonService) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.url = params['url'];
      console.log(this.url);
      this.profession = params['type'];
      this.convenience_id = params['convenience_id'];
    });
    let currentUser:any;
    currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(currentUser);
    console.log(this.currentUser);
    this.load_convenience();
  }

  doRefresh(event:any){
    setTimeout(() => {
      // Any calls to load data go here
      this.load_convenience();
      event.target.complete();
    }, 100);
  }

  load_convenience() {
    // let formData = new FormData();
    // formData.append("convenience_category_id",this.convenience_id),
    // formData.append("apptype",this.apiService.apptype),
    this.dataLoaded = false;
    this.commonService.presentLoading();
    this.apiService.load_convenience(this.convenience_id)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.list = response.data;
      this.filteredList = [...this.list]; // Initialize filtered list
      this.dataLoaded = true;
      this.isFooterVisible = true;
      this.commonService.dismissLoading();
    },
    respError => {
      this.commonService.dismissLoading();
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  filterList(event: any) {
    const query = this.searchQuery.toLowerCase();
    if (query.trim() === '') {
      this.filteredList = [...this.list];
      this.isFooterVisible = true;
    } else {
      this.filteredList = this.list.filter((item:any) =>
        item.CONVENIENCE_NAME.toLowerCase().includes(query) ||
        item.PROFESSION.toLowerCase().includes(query) ||
        item.LOCATION.toLowerCase().includes(query)
      );
      this.isFooterVisible = true;
    }
  }

  hideFooter() {
    this.isFooterVisible = false;
  }

  makeCall(phoneNumber: string) {
    this.platform.ready().then(() => {
      this.callNumber.callNumber(phoneNumber, true)
        .then(res => console.log('Dialing succeeded!', res))
        .catch(err => console.log('Dialing failed', err));
    });
  }

  showSearch() {
    this.searchFlag = !this.searchFlag;
  }

  dismiss() {
    if(this.url=='dashboard'){
      this.router.navigate(['/dashboard']);
    }
    else{
      this.router.navigate(['/convenience-list']);
    }
  }

}
