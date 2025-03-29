import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SavedItemsListPageRoutingModule } from './saved-items-list-routing.module';

import { SavedItemsListPage } from './saved-items-list.page';
import { ShareModule } from '../share/share.module';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SavedItemsListPageRoutingModule,
    ShareModule,
    SwiperModule
  ],
  declarations: [SavedItemsListPage]
})
export class SavedItemsListPageModule {}
