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
  filteredFriendRequestList: any[] = [];
  filteredHandshakeList: any[] = [];
  searchQuery: string = '';
  info = 'reachout';
  imageUrl = 'https://aapasmein.dvadminpanel.in/media/';
  filterFlag = true;
  selectedReachinRadio:string='1st';
  selectedHandshakeRadio:string='1st';
  selectedReachoutRadio:string='1st';
  requestText:string='Request-in';
  searchFlag=false;
  friendRequestDataLoaded: boolean = false;
  handshakeDataLoaded: boolean = false;
  routeURL:string = '';
  isFooterVisible: boolean = true;
  viewMsgFlag:boolean=false;
  viewHandShakeMsgFlag:boolean= false;

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

  onReachinRadioSelect(value: string) {
    console.log(value);
    this.selectedReachinRadio = value;
    if(value=='1st'){
      this.requestText = 'Request-in';
    }
    else{
      this.requestText = 'Request-out';
    }
    this.load_friend_request();
  }

  onReachoutRadioSelect(value: string) {
    console.log(value);
    this.selectedReachoutRadio = value;
    if(value=='1st'){
      this.requestText = 'Request-in';
    }
    else{
      this.requestText = 'Request-out';
    }
    this.load_friend_request();
  }

  onHandshakeRadioSelect(value: string) {
    console.log(value);
    this.selectedHandshakeRadio = value;
    if(value=='1st'){
      this.requestText = 'Request-in';
    }
    else{
      this.requestText = 'Request-out';
    }
    this.load_handshake_request();
  }

  load_friend_request() {
    this.commonService.presentLoading();
    this.friendRequestDataLoaded = false;
    this.viewMsgFlag = false;
    let formData = new FormData();
    formData.append('mobile_no',this.currentUser.mobile_no);
    formData.append('request_type',this.requestText=='Request-in'?'reachin':'reachout');
    formData.append('type','pending');
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
    this.viewHandShakeMsgFlag = false;
    let formData = new FormData();
    formData.append('mobile_no',this.currentUser.mobile_no);
    formData.append('request_type',this.requestText=='Request-in'?'reachin':'reachout');  
    formData.append('type','pending');
    this.apiService.load_hanshake_request(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.handshake_request_list = response.data;
      this.filteredHandshakeList = [...this.handshake_request_list]; // Initialize filtered list
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

  filterList(event: any) {
    const query = this.searchQuery.toLowerCase();
    if (query.trim() === '') {
      if(this.info=='reachout'){
        this.filteredFriendRequestList = [...this.friend_request_list]; // Reset when search is empty
      }
      else{
        this.filteredHandshakeList = [...this.handshake_request_list]; // Reset when search is empty
      }
      this.isFooterVisible = true;
    } else {
      if(this.info=='reachout'){
        this.filteredFriendRequestList = this.friend_request_list.filter((item:any) => 
          item.SENDER__NAME.toLowerCase().includes(query)
        );
      }
      else{
        this.filteredHandshakeList = this.handshake_request_list.filter((item:any) => 
          item.SENDER__NAME.toLowerCase().includes(query)
        );
      }
      this.isFooterVisible = true;
    }
  }

  hideFooter() {
    this.isFooterVisible = false;
  }

  goToRequestMessage() {
    this.router.navigate(['/request-send']);
  }

  goToProfile(data:any) {console.log(data);
    this.router.navigate(['/profile'], { queryParams: { routeURL: 'request', sender_id: this.requestText=='Request-in'?data.SENDER_id:data.id, REQUEST_STATUS: data.REQUEST_STATUS } });
  }

  viewMessage() {
    this.viewMsgFlag =! this.viewMsgFlag;
  }
  viewHandShakeMessage() {
    this.viewHandShakeMsgFlag =! this.viewHandShakeMsgFlag;
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
