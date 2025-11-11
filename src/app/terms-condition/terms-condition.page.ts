import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CommonService } from '../common.service';
import { AddConveniencePage } from '../add-convenience/add-convenience.page';

@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.page.html',
  styleUrls: ['./terms-condition.page.scss'],
})
export class TermsConditionPage implements OnInit {

  acceptTerms:boolean = false;

  constructor(private router: Router, private modalCtrl: ModalController, private commonService: CommonService) { }

  ngOnInit() {
  }

  async addConveniencePage() {
    // this.router.navigate(['/add-convenience']);
    this.modalCtrl.dismiss();
    this.commonService.currentPage = '/add-convenience';
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
        this.commonService.currentPage = '/convenience-list';
      }
    })
    return await modal.present();
  }

  onAccept(){
    this.router.navigate(['/welcome']);
  }

  dismiss() {
    this.modalCtrl.dismiss({});
  }

}
