import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CommonService } from '../common.service';
import { ApiService } from '../api.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-report-reason',
  templateUrl: './report-reason.page.html',
  styleUrls: ['./report-reason.page.scss'],
})
export class ReportReasonPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  @Input() routeURL!: string;
  @Input() id!: string;
  currentUser:any;
  heading: string='';
  subHeading: string='';
  reasons: any=[];
  selectedReason: string='';
  otherReasonText: string = '';

  constructor(private modalCtrl: ModalController, private router: Router, private commonService: CommonService, private activatedRoute: ActivatedRoute,
    private apiService: ApiService
  ) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    let currentUser:any;
    currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(currentUser);
    console.log(this.currentUser);
    console.log(this.id);
    this.initializeReasons();
    // this.activatedRoute.queryParams.subscribe(params => {
    //   this.routeURL = params['routeURL'];
    //   console.log(this.routeURL);
    // });
  }

  initializeReasons() {
    switch (this.routeURL) {
      case 'eventdetails':
        this.heading = 'Why are you reporting this Event?';
        this.subHeading =
          'Your report remains anonymous. If someone is at immediate risk, please contact local emergency services without delay.';
        this.reasons = [
          'Fraud or Scams',
          'Nudity or Sexual Content',
          'Misinformation',
          'Harassment',
          'Violations of Law',
          'Copyright Infringement',
          'Impersonation',
          'Other',
        ];
        break;
      case 'communitydetails':
        this.heading = 'Why are you reporting this Community?';
        this.subHeading =
          'Your report remains anonymous. If someone is at immediate risk, please contact local emergency services without delay.';
        this.reasons = [
          'Harassment or Bullying',
          'Hate Speech',
          'Spam or Scams',
          'Violence or Harmful Content',
          'Misinformation',
          'Impersonation',
          'Nudity or Sexual Content',
          'Copyright or Intellectual Property Violations',
          'Terrorism or Organized Crime',
          'Prohibited Goods or Services',
          'Other',
        ];
        break;
      case 'malldetails':
        this.heading = 'Why are you reporting this Mall?';
        this.subHeading =
          'Your report remains anonymous. If someone is at immediate risk, please contact local emergency services without delay.';
        this.reasons = [
          'Spam',
          'Misleading or False Information',
          'Counterfeit or Fake Products',
          'Fraudulent Activity',
          'Prohibited Items',
          'Hate Speech or Offensive Content',
          'Nudity or Sexual Content',
          'Deceptive Pricing or Discounts',
          'Copyright or Intellectual Property Infringement',
          'Other',
        ];
        break;
      case 'broadcastdetails':
        this.heading = 'Why are you reporting this Broadcast?';
        this.subHeading =
          'Your report remains anonymous. If someone is at immediate risk, please contact local emergency services without delay.';
        this.reasons = [
          'Harassment or Bullying',
          'Hate Speech',
          'Violence or Harmful Content',
          'Nudity or Sexual Content',
          'Spam or Scams',
          'Misinformation',
          'Impersonation',
          'Copyright Infringement',
          'Terrorism or Extremism',
          'Prohibited Goods or Services',
          'Other',
        ];
        break;
      default:
        this.heading = 'Why are you reporting?';
        this.subHeading =
          'Your report remains anonymous. If someone is at immediate risk, please contact local emergency services without delay.';
        this.reasons = ['Other'];
    }
  }

  onReasonChange(event: any) {
    console.log('Selected reason:', this.selectedReason);
  }

  report_users() {
    if(this.selectedReason=='Other'){
      if (this.otherReasonText == '') {
        this.commonService.showToastMessage('Please write reason.', 'error-toast', 'top', 2000);
        return;
      }
    }
    let formData = new FormData();
    formData.append('user_id',this.currentUser.user_id);
    if(this.routeURL=='malldetails'){
      formData.append('mall_id',this.id);
    }
    else if(this.routeURL=='eventdetails'){
      formData.append('event_id',this.id);
    }
    else if(this.routeURL=='broadcastdetails'){
      formData.append('broadcast_id',this.id);
    }
    else{
      formData.append('community_id',this.id);
    }
    if(this.selectedReason === 'Other'){
      formData.append('reason',this.otherReasonText);
    }
    else{
      formData.append('reason',this.selectedReason);
    }
    this.apiService.report_users(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
        console.log(response);
        // this.commonService.showToastMessage(response.message, 'success-toast','', 2000);
        this.commonService.showToastMessage('Thanks for your feedback ! We will do our best to solve your report, thanks again !', 'success-toast','', 4000);
        this.modalCtrl.dismiss();
      },
      respError => {
        this.commonService.showToastMessage(respError, 'error-toast','', 4000);
      })
  }

  // submitReport() {
  //   const reportData = {
  //     reason: this.selectedReason,
  //     otherReason: this.selectedReason === 'Other' ? this.otherReasonText : null,
  //   };
  //   console.log('Report submitted:', reportData);
  //   if(this.selectedReason=='Other'){
  //     if (this.otherReasonText == '') {
  //       this.commonService.showToastMessage('Please write reason.', 'error-toast', 'top', 2000);
  //       return;
  //     }
  //   }
  //   this.commonService.showToastMessage('Thanks for your feedback ! We will do our best to solve your report, thanks again !', 'success-toast','', 4000);
  //   this.modalCtrl.dismiss(reportData);
  // }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  dismiss() {
    this.modalCtrl.dismiss();
    // if(this.routeURL=='dashboard'){
    //   this.router.navigate(['/dashboard']);
    // }
    // else{
    //   this.router.navigate(['/request-send']);
    // }
  }

  // add_reason() {
  //   if (this.reason == '') {
  //     this.commonService.showToastMessage('Please write reason.', 'error-toast', 'top', 2000);
  //     return;
  //   }
  //   this.commonService.showToastMessage('Thanks for your feedback ! We will do our best to solve your report, thanks again !', 'success-toast','', 4000);
  //   this.dismiss();
  // }

}
