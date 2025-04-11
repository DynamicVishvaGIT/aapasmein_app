import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  currentUser:any;

  constructor(private router: Router, private renderer: Renderer2, private platform: Platform, private navCtrl: NavController, 
    private commonService: CommonService, private modalCtrl: ModalController) {
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
      this.router.navigateByUrl('dashboard');
    }
    else{
      this.router.navigateByUrl('login-agreement');
    }
    this.platform.ready().then(() => {
      this.platform.backButton.subscribeWithPriority(9999, () => {
        const currentUrl = this.router.url.split('?')[0]; // Remove query parameters
        if ((currentUrl === '/dashboard' && !this.commonService.currentPage.includes('/more-details')) || currentUrl === '/login-agreement') {
          (navigator as any).app.exitApp();
        } 
        else if (currentUrl === '/feedback-modal' || (currentUrl === '/request-send' && !this.commonService.currentPage.includes('/mall-details')) || currentUrl === '/convenience-details' || (currentUrl === '/event-details' && !this.commonService.currentPage.includes('/event-details'))) {
          this.router.navigate(['/dashboard']); // Navigate back to dashboard instead of exiting
        } 
        else if(this.commonService.currentPage.includes('/add-mall') || this.commonService.currentPage.includes('/more-details') || this.commonService.currentPage.includes('/connection') || this.commonService.currentPage.includes('/edit-profile') || this.commonService.currentPage.includes('/setting-modal') || this.commonService.currentPage.includes('/add-rate')){
          this.modalCtrl.dismiss();
        }
        else {
          this.navCtrl.pop();
        }
        // if ((this.router.url.includes('dashboard') || this.router.url.includes('login-agreement')) ) {
        //   (navigator as any).app.exitApp().exitApp();
        // }
        // else{
        //   this.navCtrl.pop();
        // }
      });
    })
  }
}
