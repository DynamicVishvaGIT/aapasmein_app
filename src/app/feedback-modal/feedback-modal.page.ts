import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CommonService } from '../common.service';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-feedback-modal',
  templateUrl: './feedback-modal.page.html',
  styleUrls: ['./feedback-modal.page.scss'],
})
export class FeedbackModalPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  currentUser:any;
  samvaad:string='';
  routeURL:string = '';
  wordCount:number = 0;

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
    this.activatedRoute.queryParams.subscribe(params => {
      this.routeURL = params['routeURL'];
      console.log(this.routeURL);
    });
  }

  add_samvaad() {
    if (this.samvaad == '') {
      this.commonService.showToastMessage('Please write samvaad.', 'error-toast', 'top', 2000);
      return;
    }
    let formData = new FormData();
    formData.append('user_id',this.currentUser.user_id);
    formData.append('message',this.samvaad);
    this.apiService.add_samvaad(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.commonService.showToastMessage('Thanks for your feedback ! We will do our best to include your suggestions, thanks again !', 'success-toast','', 4000);
      this.dismiss();
    },
    respError => {
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  checkWordLimit() {
    // const words = this.samvaad.trim().split(/\s+/);
    // this.wordCount = words.length;
    // if (this.wordCount > 5) {
    //   this.samvaad = words.slice(0, 5).join(' ');
    // }
    const words = this.samvaad.trim().split(/(\s+|\b(?=[.,!?])|\b(?<=[.,!?])\s*)/).filter(word => word.trim().length > 0);
    this.wordCount = words.length;
    if (this.wordCount > 50) {
      // Limit input to the first 50 words
      this.samvaad = words.slice(0, 50).join(' ');
    }
  }

  dismiss() {
    if(this.routeURL=='dashboard'){
      this.router.navigate(['/dashboard']);
    }
    else if(this.routeURL=='features'){
      this.router.navigate(['/aapasmein-features']);
    }
    else{
      this.router.navigate(['/clarity-details']);
    }
  }

}
