import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-saved-items-list',
  templateUrl: './saved-items-list.page.html',
  styleUrls: ['./saved-items-list.page.scss'],
})
export class SavedItemsListPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  selected = false;
  searchFlag = false;
  infoSegment:string='mall';
  currentUser:any;
  broadcast_list:any=[];

  constructor(private router: Router, private apiService:ApiService, private commonService: CommonService) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    let currentUser:any;
    currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(currentUser);
    console.log(this.currentUser);
    // this.router.events.pipe(
    //   filter((event): event is NavigationEnd => event instanceof NavigationEnd) // Ensure the event is of type NavigationEnd
    //   ).subscribe((event: NavigationEnd) => {
    //     if (event.url === '/saved-items-list') { // Check if user navigated back to a specific URL
    //       this.load_saved_broadcast(); // Call your desired function
    //     }
    // });
    this.load_saved_broadcast();
  }

  load_saved_broadcast() {
    let formData = new FormData();
    formData.append("user_id",this.currentUser.user_id),
    this.apiService.load_saved_broadcast(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.broadcast_list = response.data;
    },
    respError => {
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  goToBroadcastDetails(broadcast_id:string) {
    this.router.navigate(['/broadcast-details'], { queryParams: { broadcast_id: broadcast_id, url: 'savedlist'} });
  }

  showSearch() {
    this.searchFlag = this.searchFlag;
  }

  dismiss() {
    this.router.navigate(['/profile']);
  }

}
