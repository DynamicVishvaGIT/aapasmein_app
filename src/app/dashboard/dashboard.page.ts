import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import Swiper, { SwiperOptions } from 'swiper';
import { AapasmeinmallPage } from '../aapasmeinmall/aapasmeinmall.page';
import { BroadcastListPage } from '../broadcast-list/broadcast-list.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { Subject, takeUntil } from 'rxjs';
import { CommonService } from '../common.service';
import { ShareModalPage } from '../share-modal/share-modal.page';
import { AdvertingPage } from '../adverting/adverting.page';
import { filter } from 'rxjs/operators';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  private _unsubscribeAll: Subject<any>;
  
  currentUser:any;
  address: string='';
  config: SwiperOptions = {
    pagination: true,
    slidesPerView:'auto',
    effect: 'coverflow',
    loop: true
  }
  // Store interval references for each swiper instance
  intervals: { [key: string]: any } = {};
  // Store interval references for each mall item
  mallIntervals: { [key: string]: any } = {}; 
  convenience_list:any=[];
  mall_list_data:any=[];
  event_list:any=[];
  broadcast_list_data:any=[];
  banner1_images:any=[];
  banner2_images:any=[];
  banner3_images:any=[];
  banner4_images:any=[];
  // banner_list:any={banner1_images:[],banner2_images:[],banner3_images:[],banner4_images:[]};
  imageUrl = 'https://aapasmein.dvadminpanel.in/media/';
  eventImageUrl = 'https://aapasmein.dvadminpanel.in';
  footerUrl = 'dashboard';
  showFooter:boolean = false;
  isBackNavigation = false;
  today = new Date();

  constructor(private router: Router, private modalCtrl: ModalController, private geolocation: Geolocation, private http: HttpClient,
    private apiService: ApiService, private commonService: CommonService, private loadingCtrl: LoadingController, private navigationService: NavigationService) { 
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
        if (event.url === '/dashboard') { // Check if user navigated back to a specific URL
          this.footerUrl = 'dashboard';
          this.showFooter = false;
          setTimeout(() => (this.showFooter = true));
          // const currentNavigation = this.router.getCurrentNavigation();
          // console.log(currentNavigation?.previousNavigation);
          // if (currentNavigation?.previousNavigation === null || this.navigationService.justLoggedIn) {
          //   // Only call presentLoading() for programmatic navigations
          //   this.presentLoading();
          // }
          this.load_convenience_category();
          this.load_mall_products();
          this.load_events();
          this.load_broadcast_list(); // Call your desired function
          this.load_banners();
        }
    });
    // this.getCurrentLocation();
    if (this.navigationService.justLoggedIn) {
      // Only call presentLoading() for programmatic navigations
      this.navigationService.justLoggedIn = false;
      this.presentLoading();
    }
    // this.load_convenience_category();
    // this.load_mall_products();
    // this.load_events();
    // this.load_broadcast_list();
  }

  doRefresh(event:any) {
    this.showFooter = false;
    setTimeout(() => (this.showFooter = true));
    this.load_convenience_category();
    this.load_mall_products();
    this.load_events();
    this.load_broadcast_list(); // Call your desired function
    this.load_banners();
    event.target.complete();
  }

  async presentLoading() {   // Call this For Advertisement Banner
    const loading = await this.loadingCtrl.create({
      spinner: 'crescent',
      message: 'Loading...',
    });
    // await loading.present();
    this.advertising()
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  async advertising() {
    const modal = await this.modalCtrl.create({
      component: AdvertingPage,
      presentingElement: await this.modalCtrl.getTop() 
    });
    await modal.present();
  }

  load_banners() {
    this.apiService.load_banners()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.banner1_images = response.banner1_images;
      this.banner2_images = response.banner2_images;
      this.banner3_images = response.banner3_images;
      this.banner4_images = response.banner4_images;
    },
    respError => {
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  load_convenience_category() {
    this.apiService.load_convenience_category()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.convenience_list = response.data;
    },
    respError => {
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  load_mall_products() {
    // let formData = new FormData();
    // formData.append('mobile_no',this.currentUser.mobile_no);
    // formData.append('apptype',this.apiService.apptype);
    this.apiService.load_mall_products(this.currentUser.mobile_no)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
        console.log(response);
        this.mall_list_data = response.data;
      },
      respError => {
        this.commonService.showToastMessage(respError, 'error-toast','', 4000);
      })
  }

  load_events() {
    // let formData = new FormData();
    // formData.append("mobile_no",this.currentUser.mobile_no),
    // formData.append('apptype',this.apiService.apptype);
    this.event_list = [];
    this.apiService.load_events(this.currentUser.mobile_no)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      for(let i=0;i<response.data.length;i++){
        for(let j=0;j<response.data[i].events.length;j++){
          if(new Date(response.data[i].events[j].date) > this.today){
            response.data[i].events[j].interest_button = true;
          }
          else{
            response.data[i].events[j].interest_button = false;
          }
          this.event_list.push(response.data[i].events[j]);
        }
      }
      console.log(this.event_list);
    },
    respError => {
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  load_broadcast_list() {
    // let formData = new FormData();
    // formData.append('mobile_no',this.currentUser.mobile_no);
    // formData.append('apptype',this.apiService.apptype);
    this.apiService.load_broadcast_list(this.currentUser.mobile_no)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.broadcast_list_data = response.data;
    },
    respError => {
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  async shareDetails(broadcast_id:string) {
    let modal = await this.modalCtrl.create({ component: ShareModalPage, componentProps:{broadcast_id: broadcast_id, }});
    modal.onDidDismiss().then((modalItem) => {
      if (modalItem) {
        
      }
    })
    return await modal.present();
  }

  // getCurrentLocation() {
  //   this.geolocation.getCurrentPosition().then((resp) => {
  //     const lat = resp.coords.latitude;
  //     const lng = resp.coords.longitude;

  //     this.reverseGeocode(lat, lng);
  //   }).catch((error) => {
  //     console.log('Error getting location', error);
  //   });
  // }

  // reverseGeocode(lat: number, lng: number) {
  //   const apiKey = 'AIzaSyDinqEFwSCs66zyeb1WwpjmklkC8pio99k';
  //   const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

  //   this.http.get(url).subscribe((result: any) => {
  //     if (result.status === 'OK') {
  //       this.address = result.results[0].formatted_address;
  //       console.log(this.address);
  //       alert(JSON.stringify(this.address));
  //     } else {
  //       this.address = 'Location not found';
  //     }
  //   }, (error) => {
  //     console.log('Error with reverse geocoding:', error);
  //     this.address = 'Error retrieving location';
  //   });
  // }

  async setSwiperInstance(swiper: Swiper, bannerType: 'banner1' | 'banner2' | 'banner3' | 'banner4') {
    let imagesArray = this.getImagesArray(bannerType);
  
    if (swiper && imagesArray.length > 1) {
      // Clear existing interval if it exists
      if (this.intervals[bannerType]) clearInterval(this.intervals[bannerType]);
  
      // Start sliding only if more than one image exists
      this.intervals[bannerType] = setInterval(() => {
        swiper.slideNext();
      }, 4000);
    }
  }
  
  // Helper method to get the appropriate banner array
  getImagesArray(bannerType: string): any[] {
    switch (bannerType) {
      case 'banner1': return this.banner1_images;
      case 'banner2': return this.banner2_images;
      case 'banner3': return this.banner3_images;
      case 'banner4': return this.banner4_images;
      default: return [];
    }
  }

  async setMallSwiperInstance(swiper: Swiper, mallId: string, images: string[]) {
    if (swiper && images.length > 1) {
      // Clear any existing interval for this mall item
      if (this.mallIntervals[mallId]) clearInterval(this.mallIntervals[mallId]);
  
      // Start sliding only if more than one image exists
      this.mallIntervals[mallId] = setInterval(() => {
        swiper.slideNext();
      }, 4000);
    }
  }

  // async setSwiperInstance(swiper: Swiper) {
  //   if(swiper){
  //     setInterval(() => {
  //       swiper.slideNext();
  //     }, 4000);
  //   }
  // }

  goToAppasmeinMall() {
    this.router.navigate(['/aapasmeinmall']);
    // let modal = await this.modalCtrl.create({ component: AapasmeinmallPage, componentProps:{search_id: search_id }});
    // let modal = await this.modalCtrl.create({ component: AapasmeinmallPage});
    // modal.onDidDismiss().then((modalItem) => {
    //   if (modalItem) {
        
    //   }
    // })
    // return await modal.present();
  }

  goToBroadcastList() {
    this.router.navigate(['/broadcast-list']);
    // let modal = await this.modalCtrl.create({ component: BroadcastListPage});
    // modal.onDidDismiss().then((modalItem) => {
    //   if (modalItem) {
        
    //   }
    // })
    // return await modal.present();
  }
  goToWhatsnewList() {
    this.router.navigate(['/whatsnew-list']);
    // let modal = await this.modalCtrl.create({ component: BroadcastListPage});
    // modal.onDidDismiss().then((modalItem) => {
    //   if (modalItem) {
        
    //   }
    // })
    // return await modal.present();
  }
  goToRequestList() {
    this.router.navigate(['/request']);
  }
  goToCommunityList() {
    this.router.navigate(['/community-list']);
  }
  goToEventList() {
    // this.router.navigate(['/all-event-list']);
    this.router.navigate(['/event-category']);
  }
  goToNotification() {
    this.router.navigate(['/notifications']);
  }
  goToRewards() {
    this.router.navigate(['/rewards']);
  }
  goToClarityList() {
    this.router.navigate(['/clarity-list']);
  }
  goToConvenienceList() {
    this.router.navigate(['/convenience-list']);
  }
  goToRateList() {
    this.router.navigate(['/rate-rewards-list']);
  }
  goToAdvantageList() {
    this.router.navigate(['/advantage-list']);
  }
  goToConvenienceDetails(data:any) {
    this.router.navigate(['/convenience-details'], { queryParams: { url: 'dashboard', type: data.NAME, convenience_id: data.id} });
  }

  goToMallDetails(data:any, route:string) {
    this.router.navigate(['/request-send'], { queryParams: { mall_id: data.id, routeURL: route} });
  }

  openFeatures() {
    this.router.navigate(['/aapasmein-features']);
  }
  // goToAppasmeinMall() {
  //   this.router.navigate(['/aapasmeinmall']);
  // }

  goToAccolades() {
    this.router.navigate(['/aapasmein-accolades']);
  }

  goToUnwind() {
    this.router.navigate(['/aapasmein-unwind']);
  }

  goToSamvaad() {
    this.router.navigate(['/feedback-modal'], { queryParams: { routeURL: 'dashboard'} });
  }

  goToWall() {
    this.router.navigate(['/aapasmein-wall']);
  }

  goToDetails(data:any) {
    this.router.navigate(['/event-details'], { queryParams: {event_id: data.id, type: 'all', url: 'dashboard'} });
  }
  
  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

}
