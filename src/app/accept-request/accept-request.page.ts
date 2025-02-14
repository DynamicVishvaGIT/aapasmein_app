import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-accept-request',
  templateUrl: './accept-request.page.html',
  styleUrls: ['./accept-request.page.scss'],
})
export class AcceptRequestPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  searchFlag = false;
  routeURL:string='';
  currentUser:any;
  friend_request_list:any=[];
  handshake_request_list:any=[];
  friendRequestDataLoaded: boolean = false;
  handshakeDataLoaded:boolean=false;
  info = 'accept';
  imageUrl = 'https://aapasmein.dvadminpanel.in/media/';

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private apiService: ApiService, private commonService: CommonService) { 
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
    this.load_friend_request();
    // this.load_handshake_request();
  }

  load_friend_request() {
    this.commonService.presentLoading();
    this.friendRequestDataLoaded = false;
    let formData = new FormData();
    formData.append('mobile_no',this.currentUser.mobile_no);
    formData.append('type','accept');
    this.apiService.load_friend_request(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.friend_request_list = response.data;
      this.friendRequestDataLoaded = true;
      this.commonService.dismissLoading();
    },
    respError => {
      this.commonService.dismissLoading();
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }
  load_handshake_request() {
    this.commonService.presentLoading();
    this.handshakeDataLoaded = false;
    let formData = new FormData();
    formData.append('mobile_no',this.currentUser.mobile_no);
    formData.append('type','accept');
    this.apiService.load_hanshake_request(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.handshake_request_list = response.data;
      this.handshakeDataLoaded = true;
      this.commonService.dismissLoading();
    },
    respError => {
      this.commonService.dismissLoading();
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  showSearch() {
    this.searchFlag = !this.searchFlag;
  }

  dismiss() {
    if(this.routeURL=='profile'){
      this.router.navigate(['/profile']);
    }
    else{
      this.router.navigate(['/dashboard']);
    }
  }

}
