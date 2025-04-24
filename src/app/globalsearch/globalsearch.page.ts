import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { GlobalsearchdetailsPage } from '../globalsearchdetails/globalsearchdetails.page';
import { filter, Subject, takeUntil } from 'rxjs';
import { CommonService } from '../common.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-globalsearch',
  templateUrl: './globalsearch.page.html',
  styleUrls: ['./globalsearch.page.scss'],
})
export class GlobalsearchPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  // @Input() searchText!: string;
  // @Input() type!: string;
  searchText:string = '';
  type:string='';
  currentUser:any;
  convenience_list:any=[];
  recent_search:any=[];

  constructor(private modalCtrl: ModalController, private router: Router, private activatedRoute: ActivatedRoute,
    private commonService: CommonService, private apiService: ApiService
  ) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    let currentUser:any;
    currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(currentUser);
    console.log(this.currentUser);
    this.activatedRoute.queryParams.subscribe(params => {
      this.searchText = params['searchText'];
      console.log(this.searchText);
      this.type = params['type'];
    });
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd) // Ensure the event is of type NavigationEnd
      ).subscribe((event: NavigationEnd) => {
        if (event.url === '/globalsearch') { // Check if user navigated back to a specific URL
          this.load_convenience_category();
          this.load_recent_search();
        }
    });
    this.load_convenience_category();
    this.load_recent_search();
    // this.searchText = this.navParams.get('searchText');  //for showing search text in listing page
    // this.type = this.navParams.get('type');
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

  load_recent_search() {
    this.recent_search = [];
    // this.commonService.presentLoading();
    this.apiService.load_recent_search(this.currentUser.user_id)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
        console.log('All Data',response);
        this.recent_search = response.data;
        // this.commonService.dismissLoading();
      },
      respError => {
        this.commonService.dismissLoading();
        this.commonService.showToastMessage(respError, 'error-toast','', 2000);
      })
  }

  clear_recent_search() {
    // this.recent_search = [];
    // this.commonService.presentLoading();
    this.apiService.clear_recent_search(this.currentUser.user_id)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
        console.log('All Data',response);
        this.recent_search = [];
        // this.commonService.dismissLoading();
      },
      respError => {
        this.commonService.dismissLoading();
        this.commonService.showToastMessage(respError, 'error-toast','', 2000);
      })
  }

  async goToDetails(text:string) {
    this.router.navigate(['/globalsearchdetails'], { queryParams: { searchText: text} });
    // let modal = await this.modalCtrl.create({ component: GlobalsearchdetailsPage, componentProps:{searchText: text }});
    // modal.onDidDismiss().then((modalItem) => {
    //   if (modalItem) {
        
    //   }
    // })
    // return await modal.present();
  }

  backToDashboard() {
    // this.modalCtrl.dismiss();
    this.router.navigate(['/dashboard']);
  }

}
