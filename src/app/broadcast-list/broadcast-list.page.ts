import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { AddbroadcastPage } from '../addbroadcast/addbroadcast.page';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';
import { FilterBroadcastPage } from '../filter-broadcast/filter-broadcast.page';
import { filter } from 'rxjs/operators';
import { ShareModalPage } from '../share-modal/share-modal.page';

@Component({
  selector: 'app-broadcast-list',
  templateUrl: './broadcast-list.page.html',
  styleUrls: ['./broadcast-list.page.scss'],
})
export class BroadcastListPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  currentUser:any;
  broadcast_list:any=[];
  searchFlag=false;
  routeURL:string='';
  filteredData:string='';
  searchQuery: string = '';
  filteredList: any[] = [];
  dataLoaded:boolean = false;
  isFooterVisible: boolean = true;

  constructor(private modalCtrl: ModalController, private router: Router, private activatedRoute: ActivatedRoute, private apiService: ApiService, 
  private commonService: CommonService) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.routeURL = params['routeURL'];
      console.log(this.routeURL);
    });
    let currentUser:any;
    currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(currentUser);
    console.log(this.currentUser);
    // this.router.events.pipe(
    //   filter((event): event is NavigationEnd => event instanceof NavigationEnd) // Ensure the event is of type NavigationEnd
    //   ).subscribe((event: NavigationEnd) => {
    //     if (event.url === '/broadcast-list') { // Check if user navigated back to a specific URL
    //       this.load_broadcast_list(); // Call your desired function
    //     }
    // });
    this.load_broadcast_list();
  }

  load_broadcast_list() {
    this.commonService.presentLoading();
    // let formData = new FormData();
    // formData.append('mobile_no',this.currentUser.mobile_no);
    // formData.append("apptype",this.apiService.apptype);
    // if(this.filteredData!=''){
    //   formData.append('Category_id',this.filteredData);
    // }
    let category_id='';
    if(this.filteredData!=''){
      category_id = this.filteredData;
    }
    this.apiService.load_broadcast_list(this.currentUser.mobile_no,category_id)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.broadcast_list = response.data;
      this.filteredList = [...this.broadcast_list]; // Initialize filtered list
      this.dataLoaded = true;
      this.isFooterVisible = true;
      this.commonService.dismissLoading();
    },
    respError => {
      this.commonService.dismissLoading();
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  filterList(event: any) {
    const query = this.searchQuery.toLowerCase();
    if (query.trim() === '') {
      this.filteredList = [...this.broadcast_list];
      this.isFooterVisible = true;
    } else {
      this.filteredList = this.broadcast_list.filter((item:any) => 
        item.title_name.toLowerCase().includes(query)
      );
      this.isFooterVisible = true;
    }
  }

  hideFooter() {
    this.isFooterVisible = false;
  }

  showSearch() {
    this.searchFlag = !this.searchFlag;
  }

  async filterBroadcast() {
    const modal = await this.modalCtrl.create({
      component: FilterBroadcastPage,
      breakpoints: [0, 0.3, 0.5, 0.8],
      initialBreakpoint: 0.3
    });
    modal.onDidDismiss().then((modalItem) => {
      if (modalItem) {
        console.log(modalItem);
        if(modalItem.data!==undefined){
          this.filteredData = modalItem.data.filteredData;
          this.load_broadcast_list();
        }
        else{
        }
      }
    })
    return await modal.present();
  }

  dismiss() {
    if(this.routeURL=='myaapasmein'){
      this.router.navigate(['/my-aapasmein']);
    }
    else if(this.routeURL=='features'){
      this.router.navigate(['/aapasmein-features']);
    }
    else{
      this.router.navigate(['/dashboard']);
    }
  }

  async addBroadcast() {
    let modal = await this.modalCtrl.create({ component: AddbroadcastPage});
    modal.onDidDismiss().then((modalItem) => {
      if (modalItem) {
        this.load_broadcast_list();
      }
    })
    return await modal.present();
  }

  async shareDetails(broadcast_id:string) {
    let modal = await this.modalCtrl.create({ component: ShareModalPage, componentProps:{broadcast_id: broadcast_id, }});
    modal.onDidDismiss().then((modalItem) => {
      if (modalItem) {
        
      }
    })
    return await modal.present();
  }

  // addBroadcast() {
  //   this.router.navigate(['/addbroadcast']);
  // }

  goToBroadcastDetails(broadcast_id:string) {
    this.router.navigate(['/broadcast-details'], { queryParams: { broadcast_id: broadcast_id, url: 'broadcastlist'} });
  }

}
