import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';
import { CommonService } from '../common.service';
import { ApiService } from '../api.service';
import { NotificationConveniencePage } from '../notification-convenience/notification-convenience.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  currentUser:any;
  notification_list:any={};
  dataLoaded: boolean = false;
  filteredNotificationList: any[] = [];
  searchQuery: string = '';
  isFooterVisible: boolean = true;
  // imageUrl = 'https://aapasmein.dvadminpanel.in/media/';
  imageURL = 'https://aapasmein.dvadminpanel.in';
  categoryLabels = [
    { key: 'today', label: 'Today' },
    { key: 'yesterday', label: 'Yesterday' },
    { key: 'last7days', label: 'Last 7 Days' },
    { key: 'older', label: 'Older' }
  ];
  categorizedData: any = {
    today: [],
    yesterday: [],
    last7days: [],
    older: []
  };

  accept_text: string = 'Accept';
  reject_text: string = 'Reject';

  constructor(private router: Router, private commonService: CommonService, private apiService: ApiService, private modalCtrl: ModalController) { 
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
        if (event.url === '/notifications') { // Check if user navigated back to a specific URL
          this.load_notifications();
        }
    });
  }

  doRefresh(event:any){
    setTimeout(() => {
      // Any calls to load data go here
      this.load_notifications();
      event.target.complete();
    }, 100);
  }

  // read_notifications() {
  //   // this.commonService.presentLoading();
  //   let formData = new FormData();
  //   formData.append('user_id',this.currentUser.user_id);
  //   this.apiService.read_notifications(formData)
  //   .pipe(takeUntil(this._unsubscribeAll))
  //   .subscribe((response:any) => {
  //     console.log('read_notifications',response);
  //     this.load_notifications();
  //     // this.commonService.dismissLoading();
  //   },
  //   respError => {
  //     // this.commonService.dismissLoading();
  //     console.log(respError);
  //     this.commonService.showToastMessage(respError, 'error-toast','', 4000);
  //   })
  // }

  load_notifications() {
    this.commonService.presentLoading();
    this.dataLoaded = false;
    this.apiService.load_notifications(this.currentUser.mobile_no)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.notification_list = response.data;
      for( let i= 0;i<this.notification_list.length;i++){
        if(this.notification_list[i].USER_APPROVED==true){
          this.notification_list[i].accept_text = 'Accepted';
          this.accept_text = 'Accepted';
        }
      }
      this.filteredNotificationList = [...this.notification_list]; // Initialize filtered list
      this.isFooterVisible = true;
      this.segregateData(); // Call segregation function
      this.commonService.dismissLoading();
    },
    respError => {
      this.commonService.dismissLoading();
      console.log(respError);
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  approve_convenience(notification:any, type:string, categoryKey: string) {
    this.apiService.approve_convenience(notification.id,type)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      if(response.checkin=='accepted'){
        notification.USER_APPROVED = true;
        notification.accept_text = 'Accepted';
      }
      else{
        notification.USER_APPROVED = true;
        notification.reject_text = 'Rejected';
        const index = this.categorizedData[categoryKey].indexOf(notification);
        if (index > -1) {
          this.categorizedData[categoryKey].splice(index, 1);
        }
      }
      this.commonService.showToastMessage(response.message, 'success-toast','', 2000);
    },
    respError => {
      this.commonService.dismissLoading();
      console.log(respError);
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  filterList() {
    const query = this.searchQuery.toLowerCase();
    if (query.trim() === '') {
      this.filteredNotificationList = [...this.notification_list]; // Reset when search is empty
      this.isFooterVisible = true;
    } else {
      this.filteredNotificationList = this.notification_list.filter((item:any) => 
        item.SENDER__NAME.toLowerCase().includes(query)
      );
      this.isFooterVisible = true;
    }
  }

  segregateData() {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    
    this.categorizedData = {
      today: [],
      yesterday: [],
      last7days: [],
      older: []
    };

    this.notification_list.forEach((item:any) => {
      const createdDate = new Date(item.CREATED_DATE); // Convert to Date object
      const diffTime = today.getTime() - createdDate.getTime(); // Difference in milliseconds
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Convert to days

      if (this.isSameDay(createdDate, today)) {
        this.categorizedData.today.push(item);
      } else if (this.isSameDay(createdDate, yesterday)) {
        this.categorizedData.yesterday.push(item);
      } else if (diffDays > 1 && diffDays <= 7) {
        this.categorizedData.last7days.push(item);
      } else {
        this.categorizedData.older.push(item);
      }
    });
    this.dataLoaded = true;
    console.log(this.categorizedData); // Check in console
  }

  // Helper function to check if two dates are the same day
  isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }

  formatCategory(category: string): string {
    const labels: { [key: string]: string } = {
      today: 'Today',
      yesterday: 'Yesterday',
      last7days: 'Last 7 Days',
      older: 'Older'
    };
    return labels[category] || category;
  }

  async showConveniencePage(notification: any, categoryKey: string) {
    // this.router.navigate(['/add-convenience']);
    this.commonService.currentPage = '/show-convenience';
    const modal = await this.modalCtrl.create({
      component: NotificationConveniencePage,
      componentProps: {
        data: notification   // pass API data here
      },
      breakpoints: [0, 0.3, 0.5, 0.8],
      initialBreakpoint: 0.8,
      cssClass: 'custom-modal'
    });
    modal.onDidDismiss().then((modalItem) => {
      if (modalItem) {
        console.log(modalItem);
        if (modalItem?.data) {
          if (modalItem.data.action === 'Accepted') {
            console.log('Accepted:', modalItem.data.data);
            notification.USER_APPROVED = true;
            notification.accept_text = 'Accepted';
          } 
          else if (modalItem.data.action === 'Rejected') {
            console.log('Rejected:', modalItem.data.data);
            notification.USER_APPROVED = true;
            notification.reject_text = 'Rejected';
            const index = this.categorizedData[categoryKey].indexOf(notification);
            if (index > -1) {
              this.categorizedData[categoryKey].splice(index, 1);
            }
          }
        }
        this.commonService.currentPage = '/notification';
      }
    })
    return await modal.present();
  }

  dismiss() {
    this.router.navigate(['/dashboard']);
  }

}
