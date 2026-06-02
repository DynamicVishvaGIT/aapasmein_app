import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { CommonService } from '../common.service';
import { AddConveniencePage } from '../add-convenience/add-convenience.page';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.page.html',
  styleUrls: ['./terms-condition.page.scss'],
})
export class TermsConditionPage implements OnInit {

  acceptTerms:boolean = false;
  backButtonSub!: Subscription;

  constructor(private router: Router, private modalCtrl: ModalController, private commonService: CommonService,
    private platform: Platform) { }

  ngOnInit() {
  }

  // ionViewWillEnter() {
  //   // Handle hardware back button when modal is open
  //   this.backButtonSub = this.platform.backButton.subscribeWithPriority(9999, () => {
  //     this.modalCtrl.dismiss();
  //   });
  // }

  // ionViewWillLeave() {
  //   if (this.backButtonSub) {
  //     this.backButtonSub.unsubscribe();
  //   }
  // }

  // ngOnDestroy() {
  //   if (this.backButtonSub) {
  //     this.backButtonSub.unsubscribe();
  //   }
  // }

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

  async dismiss() {
    // this.modalCtrl.dismiss({});
  // const topModal = await this.modalCtrl.getTop();
  // if (topModal) {
  //   await topModal.dismiss();
  // }
  this.router.navigate(['/convenience-list']);
  }

  redirect2TermsCondition() {
    // this.dismiss();
    this.router.navigate(['/agreement-terms-conditions'], { queryParams: { route:'convenience'}})
  }

}
