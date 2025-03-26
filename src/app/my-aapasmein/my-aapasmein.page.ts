import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { MyActivityPage } from '../my-activity/my-activity.page';

@Component({
  selector: 'app-my-aapasmein',
  templateUrl: './my-aapasmein.page.html',
  styleUrls: ['./my-aapasmein.page.scss'],
})
export class MyAapasmeinPage implements OnInit {
  searchFlag = false;
  routeURL:string = '';
  
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.routeURL = params['routeURL'];
    });
  }

  showSearch() {
    this.searchFlag = !this.searchFlag;
  }

  async openActivity() {
    // this.showFlag = false;
    const modal = await this.modalCtrl.create({
      component: MyActivityPage,
      breakpoints: [0, 0.3, 0.5, 0.8],
      initialBreakpoint: 0.3,
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

  goToSavedItems() {
    this.router.navigate(['/saved-items-list']);
  }

  dismiss() {
    this.router.navigate(['/dashboard']);
  }

}
