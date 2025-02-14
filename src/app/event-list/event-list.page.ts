import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddConveniencePage } from '../add-convenience/add-convenience.page';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.page.html',
  styleUrls: ['./event-list.page.scss'],
})
export class EventListPage implements OnInit {

  info = 'allevent';

  constructor(private router: Router, private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  goToDetails() {
    this.router.navigate(['/event-details']);
  }

  // addEvent() {
  //   this.router.navigate(['/addevent']);
  // }
  async addEvent() {
    // this.router.navigate(['/add-convenience']);
    const modal = await this.modalCtrl.create({
      component: AddConveniencePage,
      breakpoints: [0, 0.3, 0.5, 0.8],
      initialBreakpoint: 0.8,
      cssClass: 'custom-modal'
    });
    modal.onDidDismiss().then((modalItem) => {
      if (modalItem) {
        console.log(modalItem);
        if(modalItem.data!=undefined){
          
        }
      }
    })
    return await modal.present();
  }

  dismiss() {
    this.router.navigate(['/dashboard']);
  }

}
