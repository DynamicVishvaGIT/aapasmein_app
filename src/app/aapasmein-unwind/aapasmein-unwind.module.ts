import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AapasmeinUnwindPageRoutingModule } from './aapasmein-unwind-routing.module';

import { AapasmeinUnwindPage } from './aapasmein-unwind.page';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AapasmeinUnwindPageRoutingModule,
    SwiperModule
  ],
  declarations: [AapasmeinUnwindPage]
})
export class AapasmeinUnwindPageModule {}
