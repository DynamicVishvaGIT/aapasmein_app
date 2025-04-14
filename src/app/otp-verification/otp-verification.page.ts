import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';
import { NavigationService } from '../navigation.service';

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

  constructor(private modalCtrl: ModalController, private router: Router, private apiService: ApiService,
    private commonService: CommonService, private activatedRoute: ActivatedRoute, private navigationService: NavigationService) { 
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
    this.startCountdown();
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
    if(this.referral_code!=''){
      formData.append('referral_code',this.referral_code);
    }
    this.apiService.login(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
        console.log(response);
        this.isActive = false; // 👈 stop any future resend logic
        if(response.existing==true){
          localStorage.setItem('currentUser',JSON.stringify(response.user_data));
          this.navigationService.justLoggedIn = true;
          this.router.navigate(['/dashboard']);
        }
        else{
          this.router.navigate(['/agreement'], { queryParams: { mobile_no:this.mobile_no, referral_code: this.referral_code!=''?this.referral_code:'',sender_id: response.sender_id} });
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

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
