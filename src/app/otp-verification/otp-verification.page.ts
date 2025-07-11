import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';
import { NavigationService } from '../navigation.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.page.html',
  styleUrls: ['./otp-verification.page.scss'],
})
export class OtpVerificationPage implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any>;

  otp_no:string='';
  mobile_no:any;
  user_otp:string='';
  referral_code:string='';

  timer: number = 30;
  interval: any;
  canResend: boolean = false; // 👈 controls when button shows
  resendCount = 0;
  maxResendLimit = 3;
  isActive = true;
  address:string='';
  showreset:boolean = false;
  user_id:string='';
  logged_in_user:any;

  constructor(private modalCtrl: ModalController, private router: Router, private apiService: ApiService,
    private commonService: CommonService, private activatedRoute: ActivatedRoute, private navigationService: NavigationService,
    private geolocation: Geolocation, private http: HttpClient, private alertCtrl: AlertController) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.mobile_no = params['mobile_no'];
      this.user_otp = params['user_otp'];
      this.referral_code = params['referral_code'];
      // console.log(this.user_details);
    });
    // this.user_details = this.navParams.get('user_details');
    console.log(this.mobile_no);
    console.log(this.user_otp);
    this.getCurrentLocation();
    this.startCountdown();
  }

  getCurrentLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      const lat = resp.coords.latitude;
      const lng = resp.coords.longitude;

      this.reverseGeocode(lat, lng);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  reverseGeocode(lat: number, lng: number) {
    const apiKey = 'AIzaSyDinqEFwSCs66zyeb1WwpjmklkC8pio99k';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

    this.http.get(url).subscribe((result: any) => {
      if (result.status === 'OK') {
        const addressComponents = result.results[0].formatted_address;

        // Remove Plus Code if present
        this.address = this.filterPlusCode(addressComponents);
        // alert(JSON.stringify(this.address));
        console.log(this.address);
      } else {
        this.address = 'Location not found';
      }
    }, (error) => {
      console.log('Error with reverse geocoding:', error);
      this.address = 'Error retrieving location';
    });
  }

  filterPlusCode(address: string): string {
    // This regex will filter out Plus Codes like 'M3QM+2RJ'
    // return address.replace(/^[A-Z0-9]+\+\w+\s*/, '');
    const cleanedAddress = address.replace(/^[A-Z0-9]+\+\w+,\s*/, '');
    return cleanedAddress.trim();
  }

  startCountdown() {
    this.timer = 30;
    this.canResend = false; // hide the link
    this.interval = setInterval(() => {
      this.timer--;
      if (this.timer === 0) {
        clearInterval(this.interval);
        this.canResend = true; // 👈 show "Resend OTP" link
      }
    }, 1000);
  }
  
  onClickResend() {
    if (!this.canResend || this.resendCount >= this.maxResendLimit) return;
  
    this.resendCount++;
    this.canResend = false; // Hide the link while waiting
    this.resendOTP(); // Call API
    this.startCountdown(); // Restart timer
  }

  // startCountdown() {
  //   this.timer = 30;
  //   this.interval = setInterval(() => {
  //     this.timer--;
  //     if (this.timer === 0) {
  //       clearInterval(this.interval);
  //       if (this.isActive && this.resendCount < this.maxResendLimit){
  //         this.resendOtp(); // 🔁 Auto call resend when countdown ends
  //       }
  //     }
  //   }, 1000);
  // }

  // resendOtp() {
  //   console.log('OTP resent automatically');
  //   this.resendCount++;
  //   // 👉 Call your resend OTP API here
  //   this.resendOTP();
  //   // Restart countdown
  //   // Restart countdown only if within limit
  //   if (this.resendCount < this.maxResendLimit && this.isActive) {
  //     this.startCountdown();
  //   }
  // }

  ngOnDestroy() {
    this.isActive = false; // 👈 stop any future resend logic
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  resendOTP() {
    let formData = new FormData();
    formData.append('mobile_no',this.mobile_no);
    formData.append('apptype',this.apiService.apptype);
    this.apiService.login(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.commonService.showToastMessage('The OTP is '+response.message, 'success-toast','', 4000);
      this.user_otp = response.message;
    },
    respError => {
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  onChangeOTP(otp:any) {
    console.log(otp);
    this.otp_no = otp;
  }

  verifyOTP() {
    let formData = new FormData();
    formData.append('mobile_no',this.mobile_no);
    formData.append('user_otp',this.otp_no);
    formData.append('apptype',this.apiService.apptype);
    formData.append('location', this.address);
    if(this.referral_code!=''){
      formData.append('referral_code',this.referral_code);
    }
    this.apiService.login(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
        console.log(response);
        this.isActive = false; // 👈 stop any future resend logic
        this.logged_in_user = response;
        if(!response.logged_in){
          if(response.existing==true){
            localStorage.setItem('currentUser',JSON.stringify(response.user_data));
            this.navigationService.justLoggedIn = true;
            this.router.navigate(['/dashboard']);
          }
          else{
            this.router.navigate(['/agreement'], { queryParams: { mobile_no:this.mobile_no, referral_code: this.referral_code!=''?this.referral_code:'',sender_id: response.sender_id} });
          }
        }
        else{
          this.showreset = true;
          this.user_id = response.user_data.user_id;
          this.logout_dialog();
        }
        // localStorage.setItem('currentUser',JSON.stringify(response.user_data));
        // this.commonService.setLoggedInUser(JSON.stringify(response.user_data));
        // this.user={login_username:'', login_password:''};
        // this.commonService.currentPage = '/dashboard';
        // this.router.navigate(['dashboard']);
      },
      respError => {
        this.commonService.showToastMessage(respError, 'error-toast','', 4000);
      })
    // this.router.navigate(['/agreement']);
  }

  async logout_dialog() {
    const confirm = await this.alertCtrl.create({
      // header: this.sold_unsold_text=='Mark as Sold'?'Mark as Sold':'Mark as Unsold',
      header: 'Logout Account',
      message: 'Your account is currently active on another device. Do you want to log out from the other device and continue here?',
      backdropDismiss:false,
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Ok, Logout All',
          handler: () => {
            this.logoutFromAllDevices();
          }
        }
      ]
    });
   await  confirm.present();
  }

  logoutFromAllDevices() {
    let formData = new FormData();
    formData.append('user_id',this.user_id);
    formData.append('apptype',this.apiService.apptype);
    formData.append('logout_type', 'all');
    formData.append('session_id', this.logged_in_user.user_data.session_id);
    this.apiService.logout(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      if(this.logged_in_user.existing==true){
        localStorage.setItem('currentUser',JSON.stringify(this.logged_in_user.user_data));
        this.navigationService.justLoggedIn = true;
        this.router.navigate(['/dashboard']);
      }
      else{
        this.router.navigate(['/agreement'], { queryParams: { mobile_no:this.mobile_no, referral_code: this.referral_code!=''?this.referral_code:'',sender_id: this.logged_in_user.sender_id} });
      }
    },
    respError => {
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
