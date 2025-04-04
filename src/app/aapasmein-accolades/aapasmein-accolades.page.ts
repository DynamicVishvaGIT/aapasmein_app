import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-aapasmein-accolades',
  templateUrl: './aapasmein-accolades.page.html',
  styleUrls: ['./aapasmein-accolades.page.scss'],
})
export class AapasmeinAccoladesPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  @Input() connections: any;
  @Input() search_user_details!: string;

  selectedCategory: string = 'clarity';

  clarityTrophies = [
    { name: 'White Badge', class: 'locked white', icon: 'assets/accolades/badge.png', locked: true },
    { name: 'Green Trophy', class: 'unlocked green', icon: 'assets/accolades/badge.png' },
    { name: 'Red Ribbon', class: 'locked red', icon: 'assets/accolades/badge.png', locked: true, },
    { name: 'Blue Shield', class: 'unlocked blue', icon: 'assets/accolades/badge.png' },
    { name: 'Gold Badge', class: 'unlocked gold', icon: 'assets/accolades/badge.png' },
  ];

  convenienceTrophies = [
    { name: 'White Badge', class: 'locked white', icon: 'assets/accolades/shield.png', locked: true },
    { name: 'Green Trophy', class: 'unlocked green', icon: 'assets/accolades/shield.png' },
    { name: 'Red Ribbon', class: 'locked red', icon: 'assets/accolades/shield.png', locked: true, },
    { name: 'Blue Shield', class: 'unlocked blue', icon: 'assets/accolades/shield.png' },
    { name: 'Gold Badge', class: 'locked gold', icon: 'assets/accolades/shield.png', locked: true, },
  ];

  requestTrophies = {
    invitation: [
      { name: 'Bronze Badge', class: 'locked bronze', icon: 'assets/accolades/trophy.png', locked: true, },
      { name: 'Silver Ribbon', class: 'unlocked silver', icon: 'assets/accolades/trophy.png' },
      { name: 'Gold Trophy', class: 'unlocked gold', icon: 'assets/accolades/trophy.png' },
    ],
    handshake: [
      { name: 'Bronze Shield', class: 'unlocked bronze', icon: 'assets/accolades/medal.png', locked: false, },
      { name: 'Silver trophy', class: 'locked silver', icon: 'assets/accolades/medal.png', locked: true },
      { name: 'Gold Badge', class: 'unlocked gold', icon: 'assets/accolades/medal.png' },
    ],
  };

  recognition = [
    { name: 'Bronze Badge', class: 'locked bronze', icon: 'assets/accolades/ribbon.png', locked: true, },
    { name: 'Silver Ribbon', class: 'unlocked silver', icon: 'assets/accolades/ribbon.png' },
    { name: 'Gold Trophy', class: 'locked gold', icon: 'assets/accolades/ribbon.png', locked: true },
  ];

  routeURL:string='';
  currentUser:any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private modalCtrl:ModalController, private apiService: ApiService, 
    private commonService: CommonService) { 
      this._unsubscribeAll = new Subject();
    }

  ngOnInit() {
    let currentUser:any;
    currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(currentUser);
    console.log(this.currentUser);
    this.activatedRoute.queryParams.subscribe(params => {
      this.routeURL = params['routeURL'];
    });
    this.awards_counts();
  }

  awards_counts() {
    let formData = new FormData();
    formData.append('user_id',this.currentUser.user_id);
    this.apiService.awards_counts(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.commonService.showToastMessage(response.message, 'success-toast','', 4000);
    },
    respError => {
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  dismiss() {
    // if(this.routeURL=='profile'){
    //   this.router.navigate(['/profile']);
    // }
    // else{
    //   this.router.navigate(['/dashboard']);
    // }
    this.modalCtrl.dismiss();
  }

}
