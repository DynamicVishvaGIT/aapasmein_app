import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Subject, takeUntil } from 'rxjs';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-add-rate-rewards',
  templateUrl: './add-rate-rewards.page.html',
  styleUrls: ['./add-rate-rewards.page.scss'],
})
export class AddRateRewardsPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  @Input() ratee!: string;
  currentUser:any;
  options = [{name:'Yes',value:'yes'}, {name:'No',value:'no'}];
  purpose_served: string='';
  communication_rating:number=0;
  attitude_rating: number=0;
  overall_experience: number=0;
  handshake_offered: string='';
  disabled = false;

  constructor(private modalCtrl: ModalController, private apiService: ApiService, private commonService: CommonService) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    let currentUser:any;
    currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(currentUser);
    console.log(this.currentUser);
  }

  // Select Yes/No for Question 1
  selectPurposeServed(answer: string, questionNumber: number) {
    if (questionNumber === 1) {
      this.purpose_served = answer;
      console.log(`Question 1 Answer: ${this.purpose_served}`);
      // API call can be added if needed
    }
  }

  // Rate the stars for Question 2
  selectCommunicationRate(star: number) {
    this.communication_rating = star;
    console.log(`Communication Rating: ${this.communication_rating}`);
  }

  // Rate the stars for Question 3
  selectAttitudeRate(star: number) {
    this.attitude_rating = star;
    console.log(`Attitude Rating: ${this.attitude_rating}`);
  }

  // Rate the stars for Question 4
  selectOverallExperienceRate(star: number) {
    this.overall_experience = star;
    console.log(`Overall Experience Rating: ${this.overall_experience}`);
  }

  // Select Yes/No for Question 5
  selectHandshakeOffered(answer: string, questionNumber: number) {
    if (questionNumber === 1) {
      this.handshake_offered = answer;
      console.log(`Question 5 Answer: ${this.handshake_offered}`);
      // API call can be added if needed
    }
  }

  onSubmit() {
    if (this.purpose_served == '') {
      this.commonService.showToastMessage('Please answer the 1st question.', 'error-toast', 'top', 2000);
      return;
    }
    if (this.communication_rating == 0) {
      this.commonService.showToastMessage('Please rate the 2nd question.', 'error-toast', 'top', 2000);
      return;
    }
    if (this.attitude_rating == 0) {
      this.commonService.showToastMessage('Please rate the 3rd question.', 'error-toast', 'top', 2000);
      return;
    }
    if (this.overall_experience == 0) {
      this.commonService.showToastMessage('Please rate the 4th question.', 'error-toast', 'top', 2000);
      return;
    }
    if (this.handshake_offered == '') {
      this.commonService.showToastMessage('Please answer the 5th question.', 'error-toast', 'top', 2000);
      return;
    }
    this.disabled = true;
    let formData = new FormData();
    formData.append('rater',this.currentUser.user_id);
    formData.append('ratee',this.ratee);
    formData.append('purpose_served',this.purpose_served);
    formData.append('communication_rating',this.communication_rating.toString());
    formData.append('attitude_rating',this.attitude_rating.toString());
    formData.append('overall_experience',this.overall_experience.toString());
    formData.append('handshake_offered',this.handshake_offered);
    this.apiService.rate_now(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.disabled = false;
      this.commonService.showToastMessage('You have rated successfully.', 'success-toast','', 4000);
      this.closeModal();
    },
    respError => {
      this.disabled = false;
      // this.commonService.dismissLoading();
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
