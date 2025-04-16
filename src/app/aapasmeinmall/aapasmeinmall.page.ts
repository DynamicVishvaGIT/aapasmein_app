import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import Swiper, { SwiperOptions } from 'swiper';
import { AddmallPage } from '../addmall/addmall.page';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';
import { FilterMallPage } from '../filter-mall/filter-mall.page';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-aapasmeinmall',
  templateUrl: './aapasmeinmall.page.html',
  styleUrls: ['./aapasmeinmall.page.scss'],
})
export class AapasmeinmallPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  currentUser:any;
  searchFlag = false;
  mall_data:any = [];
  filteredList: any[] = [];
  imageUrl = 'https://aapasmein.dvadminpanel.in/media/';
  config: SwiperOptions = {
    pagination: true,
    slidesPerView:'auto',
    effect: 'coverflow',
    loop: true
  }
  searchQuery: string = '';
  filteredData:string='';
  filterText:string='';
  routeURL:string='';
  isFooterVisible: boolean = true;
  dataLoaded:boolean = false;

  constructor(private modalCtrl: ModalController, private router: Router, private apiService: ApiService, private commonService: CommonService,
     private activatedRoute: ActivatedRoute, private alertCtrl: AlertController) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    let currentUser:any;
    currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(currentUser);
    console.log(this.currentUser);
    this.activatedRoute.queryParams.subscribe(params => {
      this.routeURL = params['routeURL'];
      if(this.routeURL=='features'){
        this.load_mall_products();
      }
    });
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd) // Ensure the event is of type NavigationEnd
      ).subscribe((event: NavigationEnd) => {
        if (event.url === '/aapasmeinmall') { // Check if user navigated back to a specific URL
          this.load_mall_products(); // Call your desired function
        }
    });
    // this.load_mall_products();
  }

  async setSwiperInstance(swiper: Swiper) {
    if(swiper){
      setInterval(() => {
        swiper.slideNext();
      }, 4000);
    }
  }

  load_mall_products() {
    // let formData = new FormData();
    // formData.append('mobile_no',this.currentUser.mobile_no);
    // if(this.filteredData!=''){
    //   formData.append('Category_id',this.filteredData);
    // }
    let category_id='';
    if(this.filteredData!=''){
      category_id = this.filteredData;
    }
    this.dataLoaded = false;
    console.log('category_id', category_id);
    this.commonService.presentLoading();
    // formData.append('apptype',this.apiService.apptype),
    this.apiService.load_mall_products(this.currentUser.mobile_no,category_id )
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
        console.log(response);
        this.mall_data = response.data;
        this.filteredList = [...this.mall_data]; // Initialize filtered list
        this.dataLoaded = true;
        this.isFooterVisible = true;
        this.commonService.dismissLoading();
      },
      respError => {
        this.dataLoaded = false;
        this.commonService.dismissLoading();
        this.commonService.showToastMessage(respError, 'error-toast','', 4000);
      })
  }

  filterList(event: any) {
    const query = this.searchQuery.toLowerCase();
    if (query.trim() === '') {
      this.filteredList = [...this.mall_data];
      this.isFooterVisible = true;
    } else {
      this.filteredList = this.mall_data.filter((item:any) => 
        item.product_name.toLowerCase().includes(query)
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
      this.load_mall_products();
      event.target.complete();
    }, 100);
  }

  removeFilter() {
    this.filteredData = '';
    this.filterText = '';
    this.load_mall_products();
  }

  showSearch() {
    this.searchFlag = !this.searchFlag;
  }

  dismiss() {
    if(this.routeURL=='features'){
      this.router.navigate(['/aapasmein-features']);
    }
    else{
      this.router.navigate(['/dashboard']);
    }
  }

  async addMall() {
    // this.router.navigate(['/addmall']);
    this.commonService.currentPage = '/add-mall';
    let modal = await this.modalCtrl.create({ component: AddmallPage});
    modal.onDidDismiss().then((modalItem) => {
      if (modalItem) {
        
      }
      this.commonService.currentPage = '/aapasmeinmall-list';
    })
    return await modal.present();
  }

  async filterMall() {
    const modal = await this.modalCtrl.create({
      component: FilterMallPage,
      breakpoints: [0, 0.3, 0.5, 0.8],
      initialBreakpoint: 0.3
    });
    modal.onDidDismiss().then((modalItem) => {
      if (modalItem) {
        console.log(modalItem);
        if(modalItem.data!==undefined){
          this.filteredData = modalItem.data.filteredData;
          this.filterText = modalItem.data.filterText;
          this.load_mall_products();
        }
      }
    })
    return await modal.present();
  }

  goToMallDetails(data:any, route:string) {
    this.commonService.currentPage = '/mall-details';
    this.router.navigate(['/request-send'], { queryParams: { mall_id: data.id, routeURL: route} });
  }

}
