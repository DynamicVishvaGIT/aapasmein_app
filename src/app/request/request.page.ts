import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  currentUser:any;
  friend_request_list:any=[];
  handshake_request_list:any=[];
  info = 'reachout';
  imageUrl = 'https://aapasmein.dvadminpanel.in/media/';
  filterFlag = false;
  selectedRadio:string='1st';
  requestText:string='Request-in';
  searchFlag=false;
  friendRequestDataLoaded: boolean = false;
  handshakeDataLoaded: boolean = false;
  routeURL:string = '';

  constructor(private router: Router, private apiService: ApiService, private commonService: CommonService, private activatedRoute: ActivatedRoute) { 
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

  showSearch(){
    this.searchFlag = !this.searchFlag;
  }

  onRadioSelect(value: string) {
    console.log(value);
    this.selectedRadio = value;
    if(value=='1st'){
      this.requestText = 'Request-in';
    }
    else{
      this.requestText = 'Request-out';
    }
  }

  load_friend_request() {
    this.commonService.presentLoading();
    this.friendRequestDataLoaded = false;
    let formData = new FormData();
    formData.append('mobile_no',this.currentUser.mobile_no);
    formData.append('type','pending');
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
  change_friend_request_status(data:any,type:string) {
    let formData = new FormData();
    formData.append('sender_id',data.SENDER_id);
    formData.append('status',type=='accept'?'Accepted':'Rejected');
    formData.append('mobile_no',this.currentUser.mobile_no);
    formData.append('user_id',this.currentUser.user_id);
    this.apiService.change_friend_request_status(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.load_friend_request();
    },
    respError => {
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  load_handshake_request() {
    this.commonService.presentLoading();
    this.handshakeDataLoaded = false;
    let formData = new FormData();
    formData.append('mobile_no',this.currentUser.mobile_no);
    formData.append('type','pending');
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

  change_handshake_request_status(data:any, type:string) {
    let formData = new FormData();
    formData.append('sender_user_id',data.USER_id);
    // formData.append('status','Accepted');
    formData.append('status',type=='accept'?'Accepted':'Rejected');
    formData.append('mobile_no',this.currentUser.mobile_no);
    formData.append('logged_user_id',this.currentUser.user_id);
    this.apiService.change_handshake_request_status(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.load_handshake_request();
    },
    respError => {
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  goToRequestMessage() {
    this.router.navigate(['/request-send']);
  }

  goToProfile() {
    this.router.navigate(['/profile'], { queryParams: { routeURL: 'request' } });
  }

  openFilter() {
    this.filterFlag = !this.filterFlag;
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
