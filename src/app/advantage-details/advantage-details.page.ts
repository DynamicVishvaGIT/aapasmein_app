import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';
import { AlertController, Platform } from '@ionic/angular';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';

@Component({
  selector: 'app-advantage-details',
  templateUrl: './advantage-details.page.html',
  styleUrls: ['./advantage-details.page.scss'],
})
export class AdvantageDetailsPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  advantage_list:any=[];
  searchFlag = false;
  routeURL:string='';
  profession_id:string='';
  imageUrl = 'https://aapasmein.dvadminpanel.in/media/';
  dataLoaded: boolean = false;
  isFooterVisible: boolean = true;
  filteredList: any[] = [];
  searchQuery: string = '';
  profession:string='';
  // advantage_list=[{name:'Prasenjit Chanda', occupation:'Developer', image:'../../../assets/Prasenjit_Chanda.png'},
  //                     {name:'Mamta Dalvi', occupation:'Tester', image:'../../../assets/avtar6.avif'},
  //                     {name:'Akash Tupsaminder', occupation:'Developer', image:'../../../assets/avtar3.png'},
  //                     {name:'Adinath Mehtar', occupation:'Tester', image:'../../../assets/avtar5.png'},
  //                     {name:'Satyam Bandbe', occupation:'Developer', image:'../../../assets/avtar6.webp'},
  //                     {name:'Shalaka', occupation:'Tester', image:'../../../assets/avtar1.jpg'},
  //                     {name:'Mayur Sheler', occupation:'Designer', image:'../../../assets/avtar5.png'},
  //                     {name:'Mamta Dalvi', occupation:'Tester', image:'../../../assets/avtar6.avif'},
  //                     {name:'Satyam Bandbe', occupation:'Developer', image:'../../../assets/avtar6.webp'}];

  constructor(private router: Router, private activatedRoute:ActivatedRoute, private apiService: ApiService, private commonService: CommonService,
    private alertController: AlertController, private callNumber: CallNumber, private platform: Platform
  ) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    // this.advantage_list=[{name:'Prasenjit Chanda', occupation:'Developer', image:'../../../assets/Prasenjit_Chanda.png'},
    // {name:'Mamta Dalvi', occupation:'Tester', image:'../../../assets/avtar6.avif'},
    // {name:'Akash Tupsaminder', occupation:'Developer', image:'../../../assets/avtar3.png'},
    // {name:'Adinath Mehtar', occupation:'Tester', image:'../../../assets/avtar5.png'},
    // {name:'Satyam Bandbe', occupation:'Developer', image:'../../../assets/avtar6.webp'},
    // {name:'Shalaka', occupation:'Tester', image:'../../../assets/avtar1.jpg'},
    // {name:'Mayur Sheler', occupation:'Designer', image:'../../../assets/avtar5.png'},
    // {name:'Mamta Dalvi', occupation:'Tester', image:'../../../assets/avtar6.avif'},
    // {name:'Satyam Bandbe', occupation:'Developer', image:'../../../assets/avtar6.webp'}];
    this.activatedRoute.queryParams.subscribe(params => {
      this.routeURL = params['routeURL'];
      console.log(this.routeURL);
      this.profession_id = params['profession_id'];
      console.log(this.profession_id);
      this.profession = params['type'];
    });
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd) // Ensure the event is of type NavigationEnd
      ).subscribe((event: NavigationEnd) => {
        if (event.url.startsWith('/advantage-details')) { // Check if user navigated back to a specific URL
          this.load_advantage();  
        }
    });
  }

  doRefresh(event:any){
    setTimeout(() => {
      // Any calls to load data go here
      this.load_advantage();
      event.target.complete();
    }, 100);
  }

  load_advantage() {
    this.dataLoaded = false;
    this.commonService.presentLoading();
    let formData = new FormData();
    formData.append("profession_id",this.profession_id),
    // formData.append("apptype",'mobile'),
    this.apiService.load_advantage(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.advantage_list = response.data;
      this.filteredList = [...this.advantage_list]; // Initialize filtered list
      this.isFooterVisible = true;
      this.dataLoaded = true;
      this.commonService.dismissLoading();
    },
    respError => {
      this.dataLoaded = false;
      this.commonService.dismissLoading();
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  filterList() {
    const query = this.searchQuery.toLowerCase();
    if (query.trim() === '') {
      this.filteredList = [...this.advantage_list]; // Reset when search is empty
      this.isFooterVisible = true;
    } else {
      this.filteredList = this.advantage_list.filter((item:any) => 
        item.USER__NAME.toLowerCase().includes(query)
      );
      this.isFooterVisible = true;
    }
  }

  async makeCall(phoneNumber: string) {
    const alert = await this.alertController.create({
      header: 'Confirm Call',
      message: `Do you want to call ${phoneNumber}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Call',
          handler: () => {
            this.platform.ready().then(() => {
              this.callNumber.callNumber(phoneNumber, true)
                .then(res => console.log('Dialing succeeded!', res))
                .catch(err => {
                  console.log('Dialing failed', err);
                  // Check for permission error (based on plugin error messages)
                  if (JSON.stringify(err) === '20') {
                    this.showPermissionError();
                  } else {
                    this.showGeneralError(err);
                  }
                });
            });
          }
        }
      ]
    });
    await alert.present();
  }
  
  async showPermissionError() {
    const alert = await this.alertController.create({
      header: 'Permission Required',
      message: 'This app does not have permission to make calls. Please grant the CALL_PHONE permission in settings.',
      buttons: ['OK']
    });
    await alert.present();
  }
  
  async showGeneralError(error: any) {
    const alert = await this.alertController.create({
      header: 'Call Failed',
      message: 'Unable to place the call. Error: ' + JSON.stringify(error),
      buttons: ['OK']
    });
    await alert.present();
  }

  hideFooter() {
    this.isFooterVisible = false;
  }

  showSearch() {
    this.searchFlag = !this.searchFlag;
  }

  dismiss() {
    if(this.routeURL=='profile'){
      this.router.navigate(['/profile']);
    }
    else{
      this.router.navigate(['/advantage-list']);
    }
  }

}
