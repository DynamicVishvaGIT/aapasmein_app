import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-addyellowpage',
  templateUrl: './addyellowpage.page.html',
  styleUrls: ['./addyellowpage.page.scss'],
})
export class AddyellowpagePage implements OnInit {

  constructor(private modalCtrl: ModalController, private router: Router) { }

  ngOnInit() {
  }

  dismiss() {
    // this.modalCtrl.dismiss();
    this.router.navigate(['/yellowpages']);
  }

}
