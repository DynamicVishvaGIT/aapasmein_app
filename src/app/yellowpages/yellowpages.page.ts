import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddyellowpagePage } from '../addyellowpage/addyellowpage.page';

@Component({
  selector: 'app-yellowpages',
  templateUrl: './yellowpages.page.html',
  styleUrls: ['./yellowpages.page.scss'],
})
export class YellowpagesPage implements OnInit {

  constructor(private modalCtrl: ModalController, private router: Router) { }

  ngOnInit() {
  }

  async addYellowPage() {
    this.router.navigate(['/addyellowpage']);
    // let modal = await this.modalCtrl.create({ component: AddyellowpagePage});
    // modal.onDidDismiss().then((modalItem) => {
    //   if (modalItem) {
        
    //   }
    // })
    // return await modal.present();
  }

  dismiss() {
    // this.modalCtrl.dismiss();
    this.router.navigate(['/dashboard']);
  }

}
