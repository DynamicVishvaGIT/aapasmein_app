import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-settingmodal',
  templateUrl: './settingmodal.page.html',
  styleUrls: ['./settingmodal.page.scss'],
})
export class SettingmodalPage implements OnInit {

  constructor(private modalCtrl: ModalController, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.dismiss();
    localStorage.removeItem('currentUser');
    this.router.navigate(['/welcome']);
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
