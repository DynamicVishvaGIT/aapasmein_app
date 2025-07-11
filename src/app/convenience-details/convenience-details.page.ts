import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { filter, Subject, takeUntil } from 'rxjs';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-convenience-details',
  templateUrl: './convenience-details.page.html',
  styleUrls: ['./convenience-details.page.scss'],
})
export class ConvenienceDetailsPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  url:string='';
  profession:string='';
  searchFlag=false;
  currentUser:any;
  list:any=[];
  convenience_id:string='';
  dataLoaded:boolean=false;
  searchQuery: string = '';
  filteredList: any[] = [];
  isFooterVisible: boolean = true;
  imageUrl = 'https://aapasmein.dvadminpanel.in/media/';

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private callNumber: CallNumber, private platform: Platform,
    private apiService: ApiService, private commonService: CommonService, private alertController: AlertController) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.url = params['url'];
      console.log(this.url);
      this.profession = params['type'];
      this.convenience_id = params['convenience_id'];
      let currentUser:any;
      currentUser = localStorage.getItem('currentUser');
      this.currentUser = JSON.parse(currentUser);
      console.log(this.currentUser);
      this.load_convenience();
    });
    
    // this.router.events.pipe(
    //   filter((event): event is NavigationEnd => event instanceof NavigationEnd) // Ensure the event is of type NavigationEnd
    //   ).subscribe((event: NavigationEnd) => {
    //     if (event.url === '/convenience-details') { // Check if user navigated back to a specific URL
    //       this.load_convenience(); // Call your desired function
    //     }
    // });
    // this.load_convenience();
  }

  doRefresh(event:any){
    setTimeout(() => {
      // Any calls to load data go here
      this.load_convenience();
      event.target.complete();
    }, 100);
  }

  load_convenience() {
    // let formData = new FormData();
    // formData.append("convenience_category_id",this.convenience_id),
    // formData.append("apptype",this.apiService.apptype),
    this.dataLoaded = false;
    this.commonService.presentLoading();
    this.apiService.load_convenience(this.convenience_id)
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
        item.CONVENIENCE_NAME.toLowerCase().includes(query) ||
        item.PROFESSION.toLowerCase().includes(query) ||
        item.LOCATION.toLowerCase().includes(query)
      );
      this.isFooterVisible = false;
    }
  }

  hideFooter() {
    this.isFooterVisible = false;
  }

  // makeCall(phoneNumber: string) {
  //   this.platform.ready().then(() => {
  //     this.callNumber.callNumber(phoneNumber, true)
  //       .then(res => console.log('Dialing succeeded!', res))
  //       .catch(err => console.log('Dialing failed', err));
  //   });
  // }

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

  // async makeCall(phoneNumber: string) {
  //   const alert = await this.alertController.create({
  //     header: 'Confirm Call',
  //     message: `Do you want to call ${phoneNumber}?`,
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel'
  //       },
  //       {
  //         text: 'Call',
  //         handler: () => {
  //           this.platform.ready().then(() => {
  //             this.callNumber.callNumber(phoneNumber, true)
  //               .then(res => console.log('Dialing succeeded!', res))
  //               .catch(err => console.log('Dialing failed', err));
  //           });
  //         }
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }

  showSearch() {
    this.searchFlag = !this.searchFlag;
  }

  dismiss() {
    if(this.url=='dashboard'){
      this.router.navigate(['/dashboard']);
    }
    else{
      this.router.navigate(['/convenience-list']);
    }
  }

}
