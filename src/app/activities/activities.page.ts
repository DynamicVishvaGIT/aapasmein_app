import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CommonService } from '../common.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.page.html',
  styleUrls: ['./activities.page.scss'],
})
export class ActivitiesPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  currentUser:any;
  activity_list:any={};
  dataLoaded: boolean = false;
  filteredActivityList: any[] = [];
  searchQuery: string = '';
  isFooterVisible: boolean = true;
  imageUrl = 'https://aapasmein.dvadminpanel.in/media/';
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

  constructor(private router: Router, private commonService: CommonService, private apiService: ApiService) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    let currentUser:any;
    currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(currentUser);
    console.log(this.currentUser);
    this.get_activities();
  }

  get_activities() {
    this.commonService.presentLoading();
    this.dataLoaded = false;
    let formData = new FormData();
    formData.append('mobile_no',this.currentUser.mobile_no);
    this.apiService.activity_api(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.activity_list = response.data;
      this.filteredActivityList = [...this.activity_list]; // Initialize filtered list
      this.isFooterVisible = true;
      this.dataLoaded = true;
      this.segregateData(); // Call segregation function
      this.commonService.dismissLoading();
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
      this.filteredActivityList = [...this.activity_list]; // Reset when search is empty
      this.isFooterVisible = true;
    } else {
      this.filteredActivityList = this.activity_list.filter((item:any) => 
        item.SENDER__NAME.toLowerCase().includes(query)
      );
      this.isFooterVisible = true;
    }
  }

  // segregateData() {
  //   const today = new Date();
  //   const yesterday = new Date(today);
  //   yesterday.setDate(today.getDate() - 1);
    
  //   this.categorizedData = {
  //     today: [],
  //     yesterday: [],
  //     last7days: [],
  //     older: []
  //   };

  //   this.activity_list.forEach((item: any) => {
  //     const createdDate = new Date(item.CREATED_DATE + 'Z'); // Handle UTC conversion
  //     const diffTime = today.getTime() - createdDate.getTime();
  //     const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  //     if (this.isSameDay(createdDate, today)) {
  //       this.categorizedData.today.push(item);
  //     } else if (this.isSameDay(createdDate, yesterday)) {
  //       this.categorizedData.yesterday.push(item);
  //     } else if (diffDays <= 7) { // Include all days up to 7
  //       this.categorizedData.last7days.push(item);
  //     } else {
  //       this.categorizedData.older.push(item);
  //     }
  //   });

  //   console.log(this.categorizedData); // Check in console
  // }

  // // Helper function to check if two dates are the same day
  // isSameDay(date1: Date, date2: Date): boolean {
  //   return date1.getFullYear() === date2.getFullYear() &&
  //          date1.getMonth() === date2.getMonth() &&
  //          date1.getDate() === date2.getDate();
  // }

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

    this.activity_list.forEach((item:any) => {
      const createdDate = new Date(item.UPDATED_DATE); // Convert to Date object
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

  clearNotifications() {
    this.categorizedData = { today: [], yesterday: [], last7days: [], older: [] };
  }
  
  markAsRead(notification:any) {
    console.log('Marked as read:', notification);
  }
  
  deleteNotification(notification:any) {
    for (const category in this.categorizedData) {
      this.categorizedData[category] = this.categorizedData[category].filter((n:any) => n !== notification);
    }
  }
  

  hideFooter() {
    this.isFooterVisible = false;
  }

  goToProfile(data:any) {console.log(data);
    this.router.navigate(['/profile'], { queryParams: { routeURL: 'activity', sender_id: data.id } });
  }

  dismiss() {
    this.router.navigate(['/my-aapasmein']);
  }

}
