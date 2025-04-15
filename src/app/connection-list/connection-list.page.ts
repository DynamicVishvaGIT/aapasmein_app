import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-connection-list',
  templateUrl: './connection-list.page.html',
  styleUrls: ['./connection-list.page.scss'],
})
export class ConnectionListPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  searchFlag = false;
  routeURL:string='';
  currentUser:any;
  searchText:string='';
  search_user_id:string='';
  connections:any=[];
  dataLoaded: boolean = false;
  imageUrl = 'https://aapasmein.dvadminpanel.in/media/';

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private apiService: ApiService, private commonService: CommonService) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    let currentUser:any;
    currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(currentUser);
    console.log(this.currentUser);
    this.activatedRoute.queryParams.subscribe(params => {
      // this.routeURL = params['routeURL'];
      console.log(this.routeURL);
      this.search_user_id = params['search_user_id'];
      this.searchText = params['searchText'];
    });
    this.search_keyword_details();
    // this.load_handshake_request();
  }

  doRefresh(event:any){
    setTimeout(() => {
      // Any calls to load data go here
      this.search_keyword_details();
      event.target.complete();
    }, 100);
  }

  search_keyword_details() {
    this.commonService.presentLoading();
    this.dataLoaded = false;
    let login_details:any={login_id:''};
    login_details.login_id = this.currentUser.user_id;
    this.apiService.search_keyword_details(this.search_user_id, login_details)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
        console.log('All Data',response);
        this.connections = response.connection;
        console.log(this.connections);
        this.dataLoaded = true;
        this.commonService.dismissLoading();
      },
      respError => {
        this.commonService.dismissLoading();
        this.commonService.showToastMessage(respError, 'error-toast','', 2000);
      })
  }
  

  showSearch() {
    this.searchFlag = !this.searchFlag;
  }

  goToProfileDetails(search_id:string, mobile_no:string) {
    // this.modalCtrl.dismiss();
    this.commonService.currentPage = '/connection-list';
    this.router.navigate(['/profile'], { queryParams: { search_id: search_id, routeURL:'connections', searchText: this.searchText, mobile_no: mobile_no} });
  }

  dismiss() {
    this.router.navigate(['/globalsearchdetails'], { queryParams: { searchText: this.searchText} });
  }

}
