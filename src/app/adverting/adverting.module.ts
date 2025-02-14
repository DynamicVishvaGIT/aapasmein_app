import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdvertingPageRoutingModule } from './adverting-routing.module';

import { AdvertingPage } from './adverting.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdvertingPageRoutingModule
  ],
  declarations: [AdvertingPage]
})
export class AdvertingPageModule {}
