import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { AddeventPage } from '../addevent/addevent.page';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-event-category',
  templateUrl: './event-category.page.html',
  styleUrls: ['./event-category.page.scss'],
})
export class EventCategoryPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  currentUser:any;
  list:any=[{category_name:'',category_id:'',events:[]}];
  myEventList:any=[{category_name:'',category_id:'',events:[]}];
  myInterestList:any=[{category_name:'',category_id:'',events:[]}];
  filteredList: any[] = [];
  filteredMyEventList: any[] = [];
  filteredMyInterestList: any[] = [];
  searchQuery: string = '';
  info = 'allevent';
  searchFlag=false;
  imageUrl = 'https://aapasmein.dvadminpanel.in';
  myEventDataLoaded: boolean = false;
  myInterestDataLoaded: boolean = false;
  dataLoaded: boolean = false;
  today = new Date();
  routeURL:string='';
  isFooterVisible: boolean = true;
  // lists=[{catname:'Music',events:[{date:'8/9/9807',time:'2:20pm',productname:'swiggy',name:'prasenjit chanda'},{date:'8/9/9807',time:'2:20pm',productname:'swiggy',name:'prasenjit chanda'}]},{catname:'Sports',events:[{date:'8/9/9807',time:'2:20pm',productname:'swiggy',name:'prasenjit chanda'},{date:'8/9/9807',time:'2:20pm',productname:'swiggy',name:'prasenjit chanda'}]}];

  constructor(private router: Router, private modalCtrl: ModalController, private apiService: ApiService, private commonService: CommonService, private activatedRoute: ActivatedRoute) { 
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
        this.load_events();
      }
    });
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd) // Ensure the event is of type NavigationEnd
      ).subscribe((event: NavigationEnd) => {
        if (event.url === '/event-category') { // Check if user navigated back to a specific URL
          this.load_events(); // Call your desired function
        }
    });
    // this.load_events();
    // this.load_my_events();
    // this.load_my_interested_events();
  }

  load_events() {
    this.commonService.presentLoading();
    this.dataLoaded = false;
    this.searchQuery = '';
    // let formData = new FormData();
    // formData.append("mobile_no",this.currentUser.mobile_no),
    // formData.append('apptype',this.apiService.apptype);
    this.apiService.load_events(this.currentUser.mobile_no,undefined,undefined)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.list = response.data;
      for(let i=0;i<this.list.length;i++){    // According QA Team(Mamta mam)
        for(let j=0;j<this.list[i].events.length;j++){
          if(new Date(this.list[i].events[j].date) > this.today){
            this.list[i].events[j].interest_button = true;
          }
          else{
            this.list[i].events[j].interest_button = false;
          }
        }
      }
      this.filteredList = [...this.list]; // Initialize filtered list
      this.isFooterVisible = true;
      this.dataLoaded = true;
      this.commonService.dismissLoading();
    },
    respError => {
      this.commonService.dismissLoading();
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  load_my_events() {
    this.commonService.presentLoading();
    this.myEventDataLoaded = false;
    this.searchQuery = '';
    // let formData = new FormData();
    // formData.append("user_id",this.currentUser.user_id),
    // formData.append('apptype',this.apiService.apptype);
    this.apiService.load_events(undefined,undefined,this.currentUser.user_id)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.myEventList = response.data;
      this.filteredMyEventList = [...this.myEventList]; // Initialize filtered list
      this.isFooterVisible = true;
      this.myEventDataLoaded = true;
      this.commonService.dismissLoading();
    },
    respError => {
      this.commonService.dismissLoading();
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  load_my_interested_events() {
    this.commonService.presentLoading();
    this.myInterestDataLoaded = false;
    this.searchQuery = '';
    let formData = new FormData();
    formData.append("user_id",this.currentUser.user_id),
    this.apiService.load_my_interested_events(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.myInterestList = response.data;
      for(let i=0;i<this.myInterestList.length;i++){  // According QA Team(Mamta mam)
        for(let j=0;j<this.myInterestList[i].events.length;j++){
          if(new Date(this.myInterestList[i].events[j].date) > this.today){
            this.myInterestList[i].events[j].interest_button = true;
          }
          else{
            this.myInterestList[i].events[j].interest_button = false;
          }
        }
      }
      this.filteredMyInterestList = [...this.myInterestList]; // Initialize filtered list
      this.isFooterVisible = true;
      this.myInterestDataLoaded = true;
      this.commonService.dismissLoading();
    },
    respError => {
      this.commonService.dismissLoading();
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  add_interested_event(event:any, index:number) {
    console.log(event);
    let formData = new FormData();
    formData.append("user_id",this.currentUser.user_id),
    formData.append("event_id",event.id),
    formData.append("status",event.interest==false?'on':'off'),
    this.apiService.add_interested_event(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.commonService.showToastMessage(response.message, 'success-toast','', 2000);
      if(event.interest==false){
        event.interest = true;
      }
      else{
        event.interest = false;
      }
    },
    respError => {
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  filterEventList() {
    const query = this.searchQuery.toLowerCase();
    if (query.trim() === '') {
      if(this.info=='allevent'){
        this.filteredList = [...this.list]; // Reset when search is empty
      }
      else if(this.info=='myevent'){
        this.filteredMyEventList = [...this.myEventList]; // Reset when search is empty
      }
      else{
        this.filteredMyInterestList = [...this.myInterestList]; // Reset when search is empty
      }
      this.isFooterVisible = true;
    } 
    else {
      if(this.info=='allevent'){
        this.filteredList = this.list
        .map((item:any) => ({
          ...item,
          events: item.events.filter((event:any) =>
            event.event_name.toLowerCase().includes(query) ||
            event.event_created_by.toLowerCase().includes(query) ||
            event.location.toLowerCase().includes(query)
          )
        }))
        .filter((item:any) => item.events.length > 0);
      }
      else if(this.info=='myevent'){
        this.filteredMyEventList = this.myEventList
        .map((item:any) => ({
          ...item,
          events: item.events.filter((event:any) =>
            event.event_name.toLowerCase().includes(query) ||
            event.event_created_by.toLowerCase().includes(query) ||
            event.location.toLowerCase().includes(query)
          )
        }))
        .filter((item:any) => item.events.length > 0);
      }
      else{
        this.filteredMyInterestList = this.myInterestList
        .map((item:any) => ({
          ...item,
          events: item.events.filter((event:any) =>
            event.event_name.toLowerCase().includes(query) ||
            event.event_created_by.toLowerCase().includes(query) ||
            event.location.toLowerCase().includes(query)
          )
        }))
        .filter((item:any) => item.events.length > 0);
      }
      this.isFooterVisible = false;
    }
  }

  doRefresh(event:any){
    setTimeout(() => {
      // Any calls to load data go here
      this.load_my_events();
      this.load_events();
      this.load_my_interested_events();
      event.target.complete();
    }, 100);
  }

  showSearch() {
    this.searchFlag = !this.searchFlag;
  }

  hideFooter() {
    this.isFooterVisible = false;
  }

  goToDetails(data:any, type:string) {
    this.commonService.currentPage = '/event-details';
    if(type=='myevent' || type=='myinterest'){
      if(!data.completed || (data.completed && data.user_id ==this.currentUser.user_id)){
        this.router.navigate(['/event-details'], { queryParams: {event_id: data.id, type: type, url: 'categorylist'} });
      }
      else{
        this.commonService.showToastMessage('This event has been completed.', 'error-toast','', 4000);
      }
    }
    else{
      this.router.navigate(['/event-details'], { queryParams: {event_id: data.id, type: type, url: 'categorylist'} });
    }
  }

  goToEventList(data:any, url:string) {console.log(data);
    // this.router.navigate(['/all-event-list'], { queryParams: {category_id: data.category_id, urlType: url} });
    this.router.navigate(['/event-view'], { queryParams: {category_id: data.category_id, category_name: data.category_name, urlType: url} });
  }

  async addEvent() {
    this.commonService.currentPage = '/add-event';
    let modal = await this.modalCtrl.create({ component: AddeventPage});
    modal.onDidDismiss().then((modalItem) => {
      if (modalItem) {
        this.load_events();
      }
      this.commonService.currentPage = '/event-category';
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

}
