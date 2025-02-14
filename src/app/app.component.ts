import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  currentUser:any;

  constructor(private router: Router) {
    this.initializeApp();
  }

  initializeApp() {
    this.checkLoginStatus();
  }

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
  }
}
