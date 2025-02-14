import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-adverting',
  templateUrl: './adverting.page.html',
  styleUrls: ['./adverting.page.scss'],
})
export class AdvertingPage implements OnInit {

  counter:number=0;

  constructor(private modalCtrl:ModalController) { 
    this.startcountdown();
  }

  ngOnInit() {
  }

  closeDrawer() {
    this.modalCtrl.dismiss();
    // this.drawerState=0;
  }
  startcountdown(){
    this.counter = 2;
    console.log(this.counter)
    const interval = setInterval(() => {
      console.log(this.counter);
      this.counter--;
        
      if (this.counter <= 0 ) {
        clearInterval(interval);
        this.closeDrawer();
        // this.presentLoading();
      }
    }, 1000);
  }

}
