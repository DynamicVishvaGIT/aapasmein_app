import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FeedbackModalPage } from '../feedback-modal/feedback-modal.page';

@Component({
  selector: 'app-footer-modal',
  templateUrl: './footer-modal.page.html',
  styleUrls: ['./footer-modal.page.scss'],
})
export class FooterModalPage implements OnInit {

  constructor(private modalCtrl: ModalController, private router: Router) { }

  ngOnInit() {
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  goToMyAapasmein() {
    this.closeModal();
    this.router.navigate(['/accept-request'],  { queryParams: { routeURL: 'dashboard' } });
  }

  goToProfile() {
    this.closeModal();
    this.router.navigate(['/profile']);
  }

  async goToFeedback() {
    const modal = await this.modalCtrl.create({
      component: FeedbackModalPage,
      breakpoints: [0, 0.3, 0.5, 0.8],
      initialBreakpoint: 0.6,
      cssClass: 'custom-modal'
    });
    modal.onDidDismiss().then((modalItem) => {
      if (modalItem) {
        console.log(modalItem);
        if(modalItem.data!=undefined){
        }
        else{
        }
      }
    })
    return await modal.present();
  }

}
