import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GlobalsearchdetailsPageRoutingModule } from './globalsearchdetails-routing.module';

import { GlobalsearchdetailsPage } from './globalsearchdetails.page';
import { ShareModule } from '../share/share.module';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GlobalsearchdetailsPageRoutingModule,
    ShareModule,
    SwiperModule
  ],
  declarations: [GlobalsearchdetailsPage]
})
export class GlobalsearchdetailsPageModule {}
