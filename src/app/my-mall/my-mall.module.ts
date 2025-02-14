import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyMallPageRoutingModule } from './my-mall-routing.module';

import { MyMallPage } from './my-mall.page';
import { ShareModule } from '../share/share.module';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyMallPageRoutingModule,
    ShareModule,
    SwiperModule
  ],
  declarations: [MyMallPage]
})
export class MyMallPageModule {}
