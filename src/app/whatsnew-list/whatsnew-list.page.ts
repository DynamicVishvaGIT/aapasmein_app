import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FilterWhatsnewPage } from '../filter-whatsnew/filter-whatsnew.page';

@Component({
  selector: 'app-whatsnew-list',
  templateUrl: './whatsnew-list.page.html',
  styleUrls: ['./whatsnew-list.page.scss'],
})
export class WhatsnewListPage implements OnInit {

  searchFlag = false;
  constructor(private router: Router, private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  showSearch() {
    this.searchFlag = !this.searchFlag;
  }

  async filterWhatsnew() {
    const modal = await this.modalCtrl.create({
      component: FilterWhatsnewPage,
      breakpoints: [0, 0.3, 0.5, 0.8],
      initialBreakpoint: 0.3
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

  dismiss() {
    this.router.navigate(['/dashboard']);
  }

}
