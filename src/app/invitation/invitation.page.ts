import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';
import { KeyboardService } from '../keyboard.service';
import { QuestionnairePage } from '../questionnaire/questionnaire.page';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.page.html',
  styleUrls: ['./invitation.page.scss'],
})
export class InvitationPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  currentUser:any;
  friend:any={full_name:'',city:'', location:'',mobile_number:'',email:''};
  get_cities:any = [];
  get_locations:any = [];
  accepted_data:any=[];
  inputFocused:boolean=false;
  invitedFriends:any=[];
  imageUrl = 'https://aapasmein.dvadminpanel.in/media/';

  constructor(private router: Router, private modalCtrl: ModalController, private apiService: ApiService, private commonService: CommonService, private keyboardService: KeyboardService) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    let currentUser:any;
    currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(currentUser);
    console.log(this.currentUser);
    this.get_city();
    this.get_location();
    this.load_friend_request();
  }

  onFocus() {
    // Notify the service that the keyboard is open
    this.keyboardService.setKeyboardStatus(true);
  }

  onBlur() {
    // Notify the service that the keyboard is closed
    this.keyboardService.setKeyboardStatus(false);
  }

  get_city() {
    this.apiService.get_city()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.get_cities = response.data;
      // this.get_cities.unshift({id:'',NAME:'Select City'});
    },
    respError => {
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }
  get_location() {
    this.apiService.get_location()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.get_locations = response.data;
      // this.get_locations.unshift({id:'',NAME:'Select Location'});
    },
    respError => {
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  load_friend_request() {
    // this.commonService.presentLoading();
    let formData = new FormData();
    formData.append('mobile_no',this.currentUser.mobile_no);
    formData.append('request_type','invitation');
    formData.append('type','accept');
    this.apiService.load_friend_request(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.accepted_data = response.data;
      // this.commonService.dismissLoading();
    },
    respError => {
      this.commonService.dismissLoading();
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  onInvite(){
    if(this.friend.full_name == '') {
      this.commonService.showToastMessage('Please enter name.', 'error-toast', 'top', 2000);
      return;
    }
    if(this.friend.city == '') {
      this.commonService.showToastMessage('Please enter city.', 'error-toast', 'top', 2000);
      return;
    }
    if(this.friend.location == '') {
      this.commonService.showToastMessage('Please enter location.', 'error-toast', 'top', 2000);
      return;
    }
    if(this.friend.mobile_number == '') {
      this.commonService.showToastMessage('Please enter mobile number.', 'error-toast', 'top', 2000);
      return;
    }
    let mpattern = /(^\d{10}$)/;
    if (!mpattern.test(this.friend.mobile_number)) {
      this.commonService.showToastMessage('Please enter phone number in correct format.', 'error-toast', 'top', 2000);
      return;
    }
    if(this.friend.email == '') {
      this.commonService.showToastMessage('Please enter email.', 'error-toast', 'top', 2000);
      return;
    }
    let epattern = /[A-Za-z0-9._%+-]{1,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})/;
    if (!epattern.test(this.friend.email)) {
      this.commonService.showToastMessage('Please enter email in correct format.', 'error-toast', 'top', 2000);
      return;
    }
    this.router.navigate(['/questionnaire'], { queryParams: { friend_details: JSON.stringify(this.friend)} });
    // let formData = new FormData();
    // formData.append('full_name',this.friend.full_name);
    // formData.append('city',this.friend.city);
    // formData.append('location',this.friend.location);
    // formData.append('mobile_number',this.friend.mobile_number);
    // formData.append('email',this.friend.email);
    // formData.append('user_id',this.currentUser.user_id);
    // this.apiService.invite_friend(formData)
    // .pipe(takeUntil(this._unsubscribeAll))
    // .subscribe((response:any) => {
    //     console.log(response);
    //     // localStorage.setItem('currentUser',JSON.stringify(response.user_data));
    //     this.commonService.showToastMessage(response.message, 'success-toast','', 4000);
    //     this.router.navigate(['/questionnaire']);
    //   },
    //   respError => {
    //     this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    //   })
  }

  back() {
    // this.modalCtrl.dismiss();
    this.router.navigate(['/dashboard']);
  }

}
