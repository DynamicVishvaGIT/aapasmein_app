import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { AddRateRewardsPage } from '../add-rate-rewards/add-rate-rewards.page';

@Component({
  selector: 'app-rate-rewards-list',
  templateUrl: './rate-rewards-list.page.html',
  styleUrls: ['./rate-rewards-list.page.scss'],
})
export class RateRewardsListPage implements OnInit {
  searchFlag = false;
  routeURL:string='';

  constructor(private router: Router, private modalCtrl: ModalController, private alertCtrl: AlertController, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.routeURL = params['routeURL'];
    });
  }

  showSearch() {
    this.searchFlag = !this.searchFlag;
  }

  async addRateRewardsPage(id:string) {
    const modal = await this.modalCtrl.create({
      component: AddRateRewardsPage,
      componentProps:{ratee: id },
      // breakpoints: [0, 0.3, 0.5, 0.8],
      // initialBreakpoint: 0.9,
      // cssClass: 'custom-modal'
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

  async showRateDialog() {
    const confirm = await this.alertCtrl.create({
      // header: 'Delete Scheme',
      cssClass: 'custom-alert',
      message: 'Have you work with this person?',
      buttons: [
        {
          text: 'No',
          cssClass: 'no-button',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          cssClass: 'yes-button',
          handler: () => {
            // this.addRateRewardsPage();
          }
        }
      ]
    });
   await  confirm.present();
  }

  dismiss() {
    if(this.routeURL=='features'){
      this.router.navigate(['/aapasmein-features']);
    }
    else{
      this.router.navigate(['/dashboard']);
    }
  }

}
