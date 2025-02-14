import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AapasmeinmallPageRoutingModule } from './aapasmeinmall-routing.module';

import { AapasmeinmallPage } from './aapasmeinmall.page';
import { ShareModule } from '../share/share.module';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AapasmeinmallPageRoutingModule,
    ShareModule,
    SwiperModule
  ],
  declarations: [AapasmeinmallPage]
})
export class AapasmeinmallPageModule {}
