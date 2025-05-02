import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { AddConveniencePage } from '../add-convenience/add-convenience.page';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-convenience-list',
  templateUrl: './convenience-list.page.html',
  styleUrls: ['./convenience-list.page.scss'],
})
export class ConvenienceListPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  currentUser:any;
  list:any=[];
  searchFlag=false;
  imageUrl = 'https://aapasmein.dvadminpanel.in/media/';
  routeURL:string='';
  searchQuery: string = '';
  filteredList: any[] = [];
  dataLoaded:boolean = false;
  isFooterVisible: boolean = true;

  constructor(private router: Router, private modalCtrl: ModalController, private apiService: ApiService, private commonService: CommonService,
    private activatedRoute: ActivatedRoute) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    let currentUser:any;
    currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(currentUser);
    console.log(this.currentUser);
    this.activatedRoute.queryParams.subscribe(params => {
      this.routeURL = params['routeURL'];
    });
    this.load_convenience_category();
  }

  doRefresh(event:any){
    setTimeout(() => {
      // Any calls to load data go here
      this.load_convenience_category();
      event.target.complete();
    }, 100);
  }

  load_convenience_category() {
    this.dataLoaded = false;
    this.commonService.presentLoading();
    this.apiService.load_convenience_category()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.list = response.data;
      this.filteredList = [...this.list]; // Initialize filtered list
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
      this.filteredList = [...this.list];
      this.isFooterVisible = true;
    } else {
      this.filteredList = this.list.filter((item:any) => 
        item.NAME.toLowerCase().includes(query)
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

  async addConveniencePage() {
    // this.router.navigate(['/add-convenience']);
    this.commonService.currentPage = '/add-convenience';
    const modal = await this.modalCtrl.create({
      component: AddConveniencePage,
      breakpoints: [0, 0.3, 0.5, 0.8],
      initialBreakpoint: 0.8,
      cssClass: 'custom-modal'
    });
    modal.onDidDismiss().then((modalItem) => {
      if (modalItem) {
        console.log(modalItem);
        if(modalItem.data!=undefined){
          
        }
        this.commonService.currentPage = '/convenience-list';
      }
    })
    return await modal.present();
  }

  dismiss() {
    if(this.routeURL=='features'){
      this.router.navigate(['/aapasmein-features']);
    }
    else{
      this.router.navigate(['/dashboard']);
    }
  }

  viewConvenienceDetails(data:any) {
    this.commonService.currentPage = '/convenience-details';
    this.router.navigate(['/convenience-details'], { queryParams: { url: 'list', type: data.NAME, convenience_id: data.id} });
  }

}
