import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';
import Swiper, { SwiperOptions } from 'swiper';

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
  deals_list:any=[];
  imageUrl = 'https://aapasmein.dvadminpanel.in/media/';
  config: SwiperOptions = {
    pagination: true,
    slidesPerView:'auto',
    effect: 'coverflow',
    loop: true
  }
  isFooterVisible: boolean = true;
  filteredList: any[] = [];
  dataLoaded: boolean = false;
  searchQuery: string = '';

  interval:any;

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
    // this.load_saved_broadcast();
    this.load_saved_products();
  }

  doRefresh(event:any){
    setTimeout(() => {
      // Any calls to load data go here
      this.load_saved_products();
      event.target.complete();
    }, 100);
  }

  // async setSwiperInstance(swiper: Swiper) {
  //   if(swiper){
  //     setInterval(() => {
  //       swiper.slideNext();
  //     }, 4000);
  //   }
  // }

  ngOnDestroy() {
    // Clear the interval when page is destroyed
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  async setSwiperInstance(swiper: Swiper, imagesArray: any[]) {
    if (swiper && imagesArray.length > 1) {
      // Clear existing interval if it exists
      if (this.interval) clearInterval(this.interval);
  
      // Start sliding only if more than one image exists
      this.interval = setInterval(() => {
        swiper.slideNext();
      }, 4000);
    }
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

  load_saved_products() {
    this.commonService.presentLoading();
    let formData = new FormData();
    formData.append("user_id",this.currentUser.user_id),
    this.apiService.load_saved_products(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.deals_list = response.data;
      this.filteredList = [...this.deals_list]; // Initialize filtered list
      this.dataLoaded = true;
      this.isFooterVisible = true;
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
      this.filteredList = [...this.deals_list];
      this.isFooterVisible = true;
    } else {
      this.filteredList = this.deals_list.filter((item:any) => 
        item.product_name.toLowerCase().includes(query)
      );
      this.isFooterVisible = true;
    }
  }

  hideFooter() {
    this.isFooterVisible = false;
  }

  goToBroadcastDetails(broadcast_id:string) {
    this.router.navigate(['/broadcast-details'], { queryParams: { broadcast_id: broadcast_id, url: 'savedlist'} });
  }

  goToMallDetails(data:any, route:string) {
    if(!data.is_sold){
      this.commonService.currentPage = '/mall-details';
      // alert(JSON.stringify(this.commonService.currentPage));
      this.router.navigate(['/request-send'], { queryParams: { mall_id: data.id, routeURL: route} });
    }
    else{
      this.commonService.showToastMessage('This deals has been sold-out.', 'error-toast','', 4000);
    }
  }

  showSearch() {
    this.searchFlag = this.searchFlag;
  }

  dismiss() {
    this.router.navigate(['/my-aapasmein']);
  }

}
