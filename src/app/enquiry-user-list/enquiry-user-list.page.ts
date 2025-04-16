import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CommonService } from '../common.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-enquiry-user-list',
  templateUrl: './enquiry-user-list.page.html',
  styleUrls: ['./enquiry-user-list.page.scss'],
})
export class EnquiryUserListPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  currentUser:any;
  product_id:string='';
  dataLoaded:boolean = false;
  list_data:any=[];
  filteredList:any=[];
  isFooterVisible: boolean = true;
  searchQuery: string = '';
  imageUrl = 'https://aapasmein.dvadminpanel.in/media/';
  routeURL:string='';

  constructor(private activatedRoute: ActivatedRoute, private commonService: CommonService, private apiService: ApiService, private router: Router) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    let currentUser:any;
    currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(currentUser);
    console.log(this.currentUser);
    this.activatedRoute.queryParams.subscribe(params => {
      this.product_id = params['product_id'];
      console.log(this.product_id);
      this.routeURL = params['routeURL'];
      this.get_enquiry_user_details();
    });
  }

  get_enquiry_user_details() {
    this.commonService.presentLoading();
    this.dataLoaded = false; 
    this.apiService.get_enquiry_user_details(this.product_id)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
        console.log(response);
        this.list_data = response.data;
        this.filteredList = [...this.list_data]; // Initialize filtered list
        this.isFooterVisible = true;
        this.dataLoaded = true; 
        this.commonService.dismissLoading();
      },
      respError => {
        this.commonService.dismissLoading();
        this.commonService.showToastMessage(respError, 'error-toast','', 4000);
      })
  }

  filterList() {
    const query = this.searchQuery.toLowerCase();
    if (query.trim() === '') {
      this.filteredList = [...this.list_data]; // Reset when search is empty
      this.isFooterVisible = true;
    } 
    else {
      this.filteredList = this.list_data.filter((item:any) => 
        item.USER__NAME.toLowerCase().includes(query)
      );
      this.isFooterVisible = true;
    }
  }

  hideFooter() {
    this.isFooterVisible = false;
  }

  doRefresh(event:any){
    setTimeout(() => {
      // Any calls to load data go here
      this.get_enquiry_user_details();
      event.target.complete();
    }, 100);
  }

  dismiss() {
    if(this.routeURL=='mymall'){
      this.router.navigate(['/my-mall']);
    }
    else{
      this.commonService.currentPage = '/mall-details';
      this.router.navigate(['/request-send'], { queryParams: { mall_id: this.product_id, routeURL: this.routeURL} });
    }
  }

}
