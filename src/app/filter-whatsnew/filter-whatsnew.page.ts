import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-filter-whatsnew',
  templateUrl: './filter-whatsnew.page.html',
  styleUrls: ['./filter-whatsnew.page.scss'],
})
export class FilterWhatsnewPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
