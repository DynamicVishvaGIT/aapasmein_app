import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';
import { Platform } from '@ionic/angular';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';

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
  selectedRadio:string='1st';
  requestText:string='Request-in';
  imageUrl = 'https://aapasmein.dvadminpanel.in/media/';
  filteredFriendRequestList: any[] = [];
  filteredHandshakeList: any[] = [];
  searchQuery: string = '';
  isFooterVisible: boolean = true;
  segment_type:string='';
  sender_id:string='';

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private apiService: ApiService, private commonService: CommonService,
    private platform: Platform, private callNumber: CallNumber
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
      console.log(this.routeURL);
      this.segment_type = params['segment_type'];
      console.log(this.segment_type);
      this.sender_id = params['sender_id'];
      if(this.segment_type!==undefined){
        this.info = this.segment_type;
      }
    });
    if(this.info=='accept'){
      this.load_friend_request('accept');
    }
    else if(this.info=='handshake'){
      this.load_handshake_request();
    }
    else{
      this.load_friend_request('invite');
    }
    // this.load_handshake_request();
  }

  doRefresh(event:any){
    setTimeout(() => {
      // Any calls to load data go here
      if(this.info=='accept'){
        this.load_friend_request('accept');
      }
      else if(this.info=='handshake'){
        this.load_handshake_request();
      }
      else{
        this.load_friend_request('invite');
      }
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

  onRadioSelect(value: string) {
    console.log(value);
    this.selectedRadio = value;
    if(value=='1st'){
      this.requestText = 'Request-in';
    }
    else{
      this.requestText = 'Request-out';
    }
    this.load_friend_request('accept');
  }

  load_friend_request(type:string) {
    this.commonService.presentLoading();
    this.friendRequestDataLoaded = false;
    let formData = new FormData();
    formData.append('mobile_no',this.currentUser.mobile_no);
    // formData.append('request_type',type=='accept'?this.requestText=='Request-in'?'reachin':'reachout':'invitation');
    formData.append('request_type',type=='accept'?'reachout':'invitation');
    formData.append('type','accept');
    this.apiService.load_friend_request(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.friend_request_list = response.data;
      this.filteredFriendRequestList = [...this.friend_request_list]; // Initialize filtered list
      this.isFooterVisible = true;
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
    formData.append('request_type','reachout');
    formData.append('type','accept');
    this.apiService.load_hanshake_request(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.handshake_request_list = response.data;
      this.filteredHandshakeList = [...this.handshake_request_list]; // Initialize filtered list
      this.isFooterVisible = true;
      this.handshakeDataLoaded = true;
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
      if(this.info=='accept' || this.info=='invite'){
        this.filteredFriendRequestList = [...this.friend_request_list]; // Reset when search is empty
      }
      else{
        this.filteredHandshakeList = [...this.handshake_request_list]; // Reset when search is empty
      }
      this.isFooterVisible = true;
    } else {
      if(this.info=='accept' || this.info=='invite'){
        this.filteredFriendRequestList = this.friend_request_list.filter((item:any) => 
          item.NAME.toLowerCase().includes(query)
        );
      }
      else{
        this.filteredHandshakeList = this.handshake_request_list.filter((item:any) => 
          item.NAME.toLowerCase().includes(query)
        );
      }
      this.isFooterVisible = true;
    }
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

  hideFooter() {
    this.isFooterVisible = false;
  }

  showSearch() {
    this.searchFlag = !this.searchFlag;
  }

  goToProfile(data:any) {console.log(data);
    this.router.navigate(['/profile'], { queryParams: { routeURL: 'acceptrequest', sender_id: data.id, segment_type: this.info } });
  }

  dismiss() {
    console.log(this.routeURL);
    console.log(this.sender_id);
    if(this.routeURL=='profile'){
      if(this.sender_id){
        this.router.navigate(['/profile'], {queryParams:{sender_id: this.sender_id, REQUEST_STATUS:'pending'}});
      }
      else{
        this.router.navigate(['/profile']);
      }
    }
    else{
      this.router.navigate(['/dashboard']);
    }
  }

}
