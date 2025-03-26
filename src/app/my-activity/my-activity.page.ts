import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-my-activity',
  templateUrl: './my-activity.page.html',
  styleUrls: ['./my-activity.page.scss'],
})
export class MyActivityPage implements OnInit {

  constructor(private modalCtrl: ModalController, private router: Router) { }

  ngOnInit() {
  }

  goToMyMall(){
    this.closeModal();
    this.router.navigate(['/my-mall']);
  }

  goToMyBroadcast() {
    this.closeModal();
    this.router.navigate(['/broadcast-list'],  { queryParams: { routeURL: 'myaapasmein' } });
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
