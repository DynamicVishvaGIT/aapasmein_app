import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  currentUser:any;

  constructor(private router: Router, private renderer: Renderer2, private platform: Platform, private navCtrl: NavController) {
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
        if ((this.router.url.includes('dashboard') || this.router.url.includes('login-agreement')) ) {
          (navigator as any).app.exitApp().exitApp();
        }
        else{
          this.navCtrl.pop();
        }
      });
    })
  }
}
