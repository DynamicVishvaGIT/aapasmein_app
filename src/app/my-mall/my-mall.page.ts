import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import Swiper, { SwiperOptions } from 'swiper';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-my-mall',
  templateUrl: './my-mall.page.html',
  styleUrls: ['./my-mall.page.scss'],
})
export class MyMallPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  currentUser:any;
  info = 'myproduct';
  searchFlag = false;
  mall_data:any=[];
  wish_list_data:any=[];
  imageUrl = 'https://aapasmein.dvadminpanel.in/media/';
  config: SwiperOptions = {
    pagination: true,
    slidesPerView:'auto',
    effect: 'coverflow',
    loop: true
  }
  mallDataLoaded: boolean = false;
  wishListDataLoaded: boolean = false;
  searchQuery: string = '';
  filteredList: any[] = [];
  filteredWishList: any[] = [];
  isFooterVisible: boolean = true;

  interval:any;

  constructor(private router: Router, private apiService: ApiService, private commonService: CommonService) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    let currentUser:any;
    currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(currentUser);
    console.log(this.currentUser);
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd) // Ensure the event is of type NavigationEnd
      ).subscribe((event: NavigationEnd) => {
        if (event.url === '/my-mall') { // Check if user navigated back to a specific URL
          this.get_mall_products(); // Call your desired function
        }
    });
    // this.get_mall_products();
    // this.load_wishlist_product();
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

  get_mall_products() {
    this.searchQuery = '';
    this.commonService.presentLoading();
    this.mallDataLoaded = false; 
    let formData = new FormData();
    formData.append('user_id',this.currentUser.user_id);
    this.apiService.get_mall_products('0', formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
        console.log(response);
        this.mall_data = response.data;
        this.filteredList = [...this.mall_data]; // Initialize filtered list
        this.isFooterVisible = true;
        this.mallDataLoaded = true; 
        this.commonService.dismissLoading();
      },
      respError => {
        this.commonService.dismissLoading();
        this.commonService.showToastMessage(respError, 'error-toast','', 4000);
      })
  }

  load_wishlist_product() {
    this.searchQuery = '';
    this.commonService.presentLoading();
    this.wishListDataLoaded = false; 
    let formData = new FormData();
    formData.append('user_id',this.currentUser.user_id);
    this.apiService.load_wishlist_product(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
        console.log(response);
        this.wish_list_data = response.data;
        this.filteredWishList = [...this.wish_list_data]; // Initialize filtered list
        this.isFooterVisible = true;
        this.wishListDataLoaded = true; 
        this.commonService.dismissLoading();
      },
      respError => {
        this.commonService.dismissLoading();
        this.commonService.showToastMessage(respError, 'error-toast','', 4000);
      })
  }

  filterMallList() {
    const query = this.searchQuery.toLowerCase();
    if (query.trim() === '') {
      if(this.info=='myproduct'){
        this.filteredList = [...this.mall_data]; // Reset when search is empty
      }
      else{
        this.filteredWishList = [...this.wish_list_data]; // Reset when search is empty
      }
      this.isFooterVisible = true;
    } 
    else {
      if(this.info=='myproduct'){
        this.filteredList = this.mall_data.filter((item:any) => 
          item.product_name.toLowerCase().includes(query)
        );
      }
      else{
        this.filteredWishList = this.wish_list_data.filter((item:any) => 
          item.product_name.toLowerCase().includes(query)
        );
      }
      this.isFooterVisible = true;
    }
  }

  go_to_contacted_list(product_id:string) {
    this.router.navigate(['/enquiry-user-list'], { queryParams: { product_id: product_id, routeURL: 'mymall'} });
  }

  hideFooter() {
    this.isFooterVisible = false;
  }

  doRefresh(event:any){
    setTimeout(() => {
      // Any calls to load data go here
      this.get_mall_products();
      this.load_wishlist_product();
      event.target.complete();
    }, 100);
  }

  showSearch(){
    this.searchFlag = !this.searchFlag;
  }

  goToMallDetails(data:any, route:string, type:string) {
    if(type=='mywishlist'){
      if(!data.is_sold){
        this.router.navigate(['/request-send'], { queryParams: { mall_id: data.id, routeURL: route} });
      }
      else{
        this.commonService.showToastMessage('This deals has been sold-out.', 'error-toast','', 4000);
      }
    }
    else{
      this.router.navigate(['/request-send'], { queryParams: { mall_id: data.id, routeURL: route} });
    }
  }

  dismiss() {
    this.router.navigate(['/my-aapasmein']);
  }

}
