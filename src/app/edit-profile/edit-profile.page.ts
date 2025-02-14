import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  searchFlag = false;
  user:any={name:'',city:'', location:'',mobile_no:'',email_id:'',profession:'',specialization:'',interest:''};
  inputFocused: boolean = false;
  get_cities:any = [];
  get_locations:any = [];
  get_professions:any = [];
  get_specializations:any = [];
  get_interests:any = [];

  constructor(private router: Router, private apiService: ApiService, private commonService: CommonService, private modalCtrl: ModalController) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.get_city();
    this.get_location();
    this.get_profession();
    this.get_specialization();
    this.get_interest();
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
  get_profession() {
    this.apiService.get_profession()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.get_professions = response.data;
      // this.get_professions.unshift({id:'',NAME:'Select Profession'});
    },
    respError => {
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }
  get_specialization() {
    this.apiService.get_specialization()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.get_specializations = response.data;
      // this.get_specializations.unshift({id:'',NAME:'Select Specialization'});
    },
    respError => {
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }
  get_interest() {
    this.apiService.get_interest()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.get_interests = response.data;
      // this.get_interests.unshift({id:'',NAME:'Select Interest'});
    },
    respError => {
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  onEdit() {

  }

  showSearch() {
    this.searchFlag = !this.searchFlag;
  }

  dismiss() {
    // this.router.navigate(['/profile']);
    this.modalCtrl.dismiss();
  }

}
