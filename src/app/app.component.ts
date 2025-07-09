import { Component, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { CommonService } from './common.service';
import { ApiService } from './api.service';
import { Subject, takeUntil } from 'rxjs';
import { NetworkService } from './network.service';

declare var cordova: any; // Declare cordova to use the plugin

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  private _unsubscribeAll: Subject<any>;

  currentUser:any;
  isConnected: boolean = true;

  constructor(private router: Router, private renderer: Renderer2, private platform: Platform, private navCtrl: NavController, 
    private commonService: CommonService, private modalCtrl: ModalController, private apiService: ApiService, private networkService: NetworkService) {
      this._unsubscribeAll = new Subject();
    this.initializeApp();
  }

  initializeApp() {
    // this.initializeTheme();
    this.checkLoginStatus();
  }

  // initializeTheme() {
  //   const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  //   console.log(prefersDark);
  //   this.toggleTheme(prefersDark.matches);

  //   prefersDark.addEventListener('change', (event) => {
  //     this.toggleTheme(event.matches);
  //   });
  // }

  // toggleTheme(isDark: boolean) {
  //   if (isDark) {
  //     this.renderer.addClass(document.body, 'dark-theme');
  //     this.renderer.removeClass(document.body, 'light-theme');
  //   } else {
  //     this.renderer.addClass(document.body, 'light-theme');
  //     this.renderer.removeClass(document.body, 'dark-theme');
  //   }
  // }

  checkLoginStatus(){
    let currentUser:any
    currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(currentUser);
    console.log(this.currentUser);
    if(this.currentUser!=null){
      this.check_user_logged_in();
    }
    else{
      this.router.navigateByUrl('login-agreement');
    }
    this.platform.ready().then(() => {
      // Subscribe to connectivity changes
      this.networkService.currentStatus.subscribe(status => {
        this.isConnected = status;
      });
      if (cordova && cordova.plugins && cordova.plugins.preventscreenshot) {
        cordova.plugins.preventscreenshot.enable(
          () => console.log('Screenshot prevention enabled'),
          (error:any) => console.error('Error enabling screenshot prevention', error)
        );
      }
      // Track current base route (without query params)
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.commonService.currentPage = event.urlAfterRedirects.split('?')[0];
        }
      });
    
      this.platform.backButton.subscribeWithPriority(9999, () => {
        const currentUrlWithQuery = this.router.url;
        const currentUrl = currentUrlWithQuery.split('?')[0]; // base route
        const prevUrl = this.commonService.currentPage;
    
        // ✅ Exit app from globalsearch
        if (currentUrl === '/dashboard' || currentUrl === '/login-agreement') {
          (navigator as any).app.exitApp();
        }
    
      
        // ✅ Profile → Accept Request or Connection List → Profile logic
        else if (currentUrl === '/profile') {
          const urlParams = new URLSearchParams(currentUrlWithQuery.split('?')[1] || '');
          const routeURL = urlParams.get('routeURL');
          // alert(JSON.stringify('routeURL'+routeURL));
          // alert(JSON.stringify('prevUrl'+prevUrl));
          if (routeURL === 'acceptrequest') {
            // Keep going back to accept-request as long as we came from there
            this.router.navigate(['/accept-request'], { queryParams: { routeURL: 'profile' } });
          } else if (routeURL === 'connections' && prevUrl === '/profile') {
            this.router.navigate(['/connection-list'], { queryParamsHandling: 'preserve' });
          } else {
            this.router.navigate(['/dashboard']);
          }
        }
    
        // ✅ Connection List → Global Search Details
        else if (currentUrl === '/connection-list') {
          this.router.navigate(['/globalsearchdetails'], { queryParamsHandling: 'preserve' });
        }
    
        // ✅ Global Search Details → Global Search
        else if (currentUrl === '/globalsearchdetails') {
          this.router.navigate(['/globalsearch']);
        }
        else if (currentUrl === '/globalsearch') {
         this.router.navigate(['/dashboard']); // or exit if desired
        }
    
    
        // ✅ Accept Request → Profile
        else if (currentUrl === '/accept-request') {
          this.router.navigate(['/profile']);
          // this.router.navigate(['/profile'], {
          //   queryParams: { routeURL: 'acceptrequest' },
          //   queryParamsHandling: 'merge'
          // });
        }
        // else if (
        //   (currentUrl === '/request-send' && !prevUrl.includes('/saveditem'))
        // ) {
        //   this.router.navigate(['/dashboard']);
        // }
        // ✅ Other routes like modal/dismiss logic
        else if (
          currentUrl === '/feedback-modal' ||
          (currentUrl === '/request-send' && !prevUrl.includes('/mall-details')) ||
          (currentUrl === '/convenience-details' && !prevUrl.includes('/convenience-details')) ||
          (currentUrl === '/event-details' && !prevUrl.includes('/event-details')) ||
          (currentUrl === '/profile' && prevUrl.includes('/profile'))
        ) {
          this.router.navigate(['/dashboard']);
        }
    
        else if (
          prevUrl.includes('/add-mall') || prevUrl.includes('/add-event') || prevUrl.includes('/more-details') ||
          prevUrl.includes('/connection') || prevUrl.includes('/edit-profile') ||
          prevUrl.includes('/setting-modal') || prevUrl.includes('/add-rate') || prevUrl.includes('add-convenience')
        ) {
          this.modalCtrl.dismiss();
        }
    
        // ✅ Fallback: Go one step back in navigation stack
        else {
          this.navCtrl.pop();
        }
      });
    });

    // this.platform.ready().then(() => {
    //   this.router.events.subscribe(event => {
    //     if (event instanceof NavigationEnd) {
    //       this.commonService.currentPage = event.urlAfterRedirects.split('?')[0];
    //     }
    //   });
    
    //   this.platform.backButton.subscribeWithPriority(9999, () => {
    //     const currentUrl = this.router.url.split('?')[0]; // Get current route path
    //     const prevUrl = this.commonService.currentPage;    // Last route before current
    
    //     // Exit app from initial page
    //     if (currentUrl === '/dashboard' || currentUrl === '/login-agreement') {
    //       (navigator as any).app.exitApp();
    //     }
    
    //     // Global Search back logic
    //     else if (currentUrl === '/profile') {
    //       this.router.navigate(['/connection-list'], {
    //         queryParamsHandling: 'preserve'
    //       });
    //     } else if (currentUrl === '/connection-list') {
    //       this.router.navigate(['/globalsearchdetails'], {
    //         queryParamsHandling: 'preserve'
    //       });
    //     } else if (currentUrl === '/globalsearchdetails') {
    //       this.router.navigate(['/globalsearch']);
    //     } else if (currentUrl === '/globalsearch') {
    //       this.router.navigate(['/dashboard']); // or exit if desired
    //     }
    
    //     // Custom routes for modals or other conditions
    //     else if (
    //       currentUrl === '/feedback-modal' ||
    //       (currentUrl === '/request-send' && !prevUrl.includes('/mall-details')) ||
    //       (currentUrl === '/convenience-details' && !prevUrl.includes('/convenience-details')) ||
    //       (currentUrl === '/event-details' && !prevUrl.includes('/event-details')) ||
    //       (currentUrl === '/profile' && prevUrl.includes('/profile'))
    //     ) {
    //       this.router.navigate(['/dashboard']);
    //     }
    
    //     else if (
    //       prevUrl.includes('/add-mall') || prevUrl.includes('/add-event') || prevUrl.includes('/more-details') ||
    //       prevUrl.includes('/connection') || prevUrl.includes('/edit-profile') ||
    //       prevUrl.includes('/setting-modal') || prevUrl.includes('/add-rate')
    //     ) {
    //       this.modalCtrl.dismiss();
    //     }
    
    //     else if (currentUrl === '/profile' && prevUrl.includes('/accept-request')) {
    //       this.router.navigate(['/accept-request'], { queryParams: { routeURL: 'profile' } });
    //     }
    
    //     else if (currentUrl === '/accept-request' && prevUrl.includes('/accept-request')) {
    //       this.commonService.currentPage = '/profile';
    //       this.router.navigate(['/profile']);
    //     }
    
    //     // Default fallback
    //     else {
    //       this.navCtrl.pop();
    //     }
    //   });
    // });


    // this.platform.ready().then(() => {
    //   this.platform.backButton.subscribeWithPriority(9999, () => {
    //     const currentUrl = this.router.url.split('?')[0]; // Remove query parameters
    //     if ((currentUrl === '/dashboard' && !this.commonService.currentPage.includes('/more-details')) || currentUrl === '/login-agreement') {
    //       (navigator as any).app.exitApp();
    //     } 
    //     else if (currentUrl === '/feedback-modal' || (currentUrl === '/request-send' && !this.commonService.currentPage.includes('/mall-details')) || (currentUrl === '/convenience-details' && !this.commonService.currentPage.includes('/convenience-details')) || (currentUrl === '/event-details' && !this.commonService.currentPage.includes('/event-details') || (currentUrl === '/profile' && this.commonService.currentPage.includes('/profile')) )) {
    //       this.router.navigate(['/dashboard']); // Navigate back to dashboard instead of exiting
    //     } 
    //     else if(this.commonService.currentPage.includes('/add-mall') || this.commonService.currentPage.includes('/add-event') || this.commonService.currentPage.includes('/more-details') || this.commonService.currentPage.includes('/connection') || this.commonService.currentPage.includes('/edit-profile') || this.commonService.currentPage.includes('/setting-modal') || this.commonService.currentPage.includes('/add-rate')){
    //       this.modalCtrl.dismiss();
    //     }
    //     else if((currentUrl === '/profile' && this.commonService.currentPage.includes('/accept-request'))){
    //       this.router.navigate(['/accept-request'],  { queryParams: { routeURL: 'profile' } });
    //     }
    //     else if((currentUrl === '/accept-request' && this.commonService.currentPage.includes('/accept-request'))){
    //       this.commonService.currentPage = '/profile';
    //       this.router.navigate(['/profile']);
    //     }
    //     // else if((currentUrl === '/profile' && this.commonService.currentPage.includes('/connection-list'))){
    //     //   this.router.navigate(['/connection-list']);
    //     // }
    //     else {
    //       this.navCtrl.pop();
    //     }
    //     // if ((this.router.url.includes('dashboard') || this.router.url.includes('login-agreement')) ) {
    //     //   (navigator as any).app.exitApp().exitApp();
    //     // }
    //     // else{
    //     //   this.navCtrl.pop();
    //     // }
    //   });
    // })
  }

  check_user_logged_in() {
    let formData = new FormData();
    formData.append('user_id',this.currentUser.user_id);
    formData.append('session_id', this.currentUser.session_id);
    this.apiService.check_user_logged_in(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      if(!response.loggedin){
        this.logoutMyDevice();
      }
      else{
        this.router.navigateByUrl('dashboard');
      }
    },
    respError => {
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  logoutMyDevice() {
    let formData = new FormData();
    formData.append('user_id',this.currentUser.user_id);
    formData.append('apptype','mobile');
    formData.append('logout_type', 'single');
    formData.append('session_id', this.currentUser.session_id);
    this.apiService.logout(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.logout();
    },
    respError => {
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  logout() {
    this.dismiss();
    localStorage.removeItem('currentUser');
    localStorage.clear();  // Clear all local storage data
    sessionStorage.clear(); // Clear session storage
    // this.router.navigate(['/welcome']);
    this.router.navigate(['/login-agreement']);
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
