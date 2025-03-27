import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CommonService } from '../common.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.page.html',
  styleUrls: ['./activities.page.scss'],
})
export class ActivitiesPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  currentUser:any;
  activity_list:any=[];
  dataLoaded: boolean = false;
  filteredActivityList: any[] = [];
  searchQuery: string = '';
  isFooterVisible: boolean = true;
  imageUrl = 'https://aapasmein.dvadminpanel.in/media/';

  constructor(private router: Router, private commonService: CommonService, private apiService: ApiService) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    let currentUser:any;
    currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(currentUser);
    console.log(this.currentUser);
    this.load_friend_request();
  }

  load_friend_request() {
    this.commonService.presentLoading();
    this.dataLoaded = false;
    let formData = new FormData();
    formData.append('mobile_no',this.currentUser.mobile_no);
    formData.append('request_type','reachin');
    formData.append('type','accept');
    this.apiService.load_friend_request(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.activity_list = response.data;
      this.filteredActivityList = [...this.activity_list]; // Initialize filtered list
      this.isFooterVisible = true;
      this.dataLoaded = true;
      this.commonService.dismissLoading();
    },
    respError => {
      this.commonService.dismissLoading();
      console.log(respError);
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  filterList() {
    const query = this.searchQuery.toLowerCase();
    if (query.trim() === '') {
      this.filteredActivityList = [...this.activity_list]; // Reset when search is empty
      this.isFooterVisible = true;
    } else {
      this.filteredActivityList = this.activity_list.filter((item:any) => 
        item.SENDER__NAME.toLowerCase().includes(query)
      );
      this.isFooterVisible = true;
    }
  }

  hideFooter() {
    this.isFooterVisible = false;
  }

  goToProfile(data:any) {console.log(data);
    this.router.navigate(['/profile'], { queryParams: { routeURL: 'activity', sender_id: data.id } });
  }

  dismiss() {
    this.router.navigate(['/my-aapasmein']);
  }

}
