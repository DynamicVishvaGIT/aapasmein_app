import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-advantage-list',
  templateUrl: './advantage-list.page.html',
  styleUrls: ['./advantage-list.page.scss'],
})
export class AdvantageListPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  currentUser:any;
  list:any=[];
  searchFlag=false;
  imageUrl = 'https://aapasmein.dvadminpanel.in/media/';
  routeURL: string='';
  searchQuery: string = '';
  filteredList: any[] = [];
  chunkSize = 10;
  currentPage = 1;
  totalChunks: number=0;
  dataLoaded:boolean = false;
  isFooterVisible: boolean = true;

  constructor(private router: Router, private modalCtrl: ModalController, private apiService: ApiService, private commonService: CommonService,
    private activatedRoute: ActivatedRoute, private elRef: ElementRef) { 
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
    this.get_profession();
  }

  doRefresh(event:any){
    setTimeout(() => {
      // Any calls to load data go here
      this.get_profession();
      event.target.complete();
    }, 100);
  }

  get_profession() {
    this.dataLoaded = false;
    this.commonService.presentLoading();
    this.apiService.get_profession()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.list = response.data;
      this.totalChunks = Math.ceil(this.list.length / this.chunkSize);  //For infinite scroll
      // this.filteredList = [...this.list]; // Initialize filtered list
      this.filteredList = this.list.slice(0, this.chunkSize);
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
      // this.filteredList = [...this.list]; // Reset when search is empty
      // this.totalChunks = Math.ceil(this.list.length / this.chunkSize);  //For infinite scroll
      // this.filteredList = this.list.slice(0, this.chunkSize);
      // this.isFooterVisible = true;
      this.get_profession();
    } else {
      this.filteredList = this.list.filter((item:any) => 
        item.NAME.toLowerCase().includes(query)
      );
      // this.isFooterVisible = true;
      // Reset infinite scroll logic
      this.currentPage = 1;  // Start from the first page
      this.totalChunks = Math.ceil(this.filteredList.length / this.chunkSize);  // Update total chunks based on filtered data
      // Load the first chunk of filtered results
      this.filteredList = this.filteredList.slice(0, this.chunkSize);
      // Enable infinite scroll again
      const infiniteScroll = document.querySelector('ion-infinite-scroll');
      if (infiniteScroll) {
        infiniteScroll.disabled = false;  // Re-enable infinite scroll
      }
    }
  }

  //For infinite scroll
  loadNextChunk(event:any) {    
    if (this.currentPage < this.totalChunks) {
      setTimeout(() => {
      // const startIndex = (this.currentPage - 1) * this.chunkSize;
      const startIndex = this.currentPage * this.chunkSize; // for duplicate data
      const endIndex = startIndex + this.chunkSize;
      const nextChunk = this.list.slice(startIndex, endIndex);
      // this.funds = [...this.funds, ...nextChunk];
      this.filteredList = [...this.filteredList, ...nextChunk];
      this.currentPage++;
      if (event) {
        event.target.complete();
      }
    }, 2000); // 2-second delay
    } else if (event) {
      event.target.disabled = true;
    }
  }
  

  showSearch() {
    this.searchFlag =! this.searchFlag;
  }

  dismiss() {
    if(this.routeURL=='features'){
      this.router.navigate(['/aapasmein-features']);
    }
    else{
      this.router.navigate(['/dashboard']);
    }
  }
  hideFooter() {
    this.isFooterVisible = false;
  }

  // Detect clicks anywhere on the page
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const searchbar = this.elRef.nativeElement.querySelector('ion-searchbar');
    
    if (searchbar && !searchbar.contains(event.target)) {
      this.isFooterVisible = true; // Show footer when clicking outside
    }
  }
  // showFooter() {
  //   this.isFooterVisible = true;
  // }

  viewAdvantageDetails(data:any) {
    this.router.navigate(['/advantage-details'], { queryParams: { url: 'list',type: data.NAME, profession_id: data.id} });
  }

}
