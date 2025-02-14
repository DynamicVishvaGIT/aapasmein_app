import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdvantageDetailsPageRoutingModule } from './advantage-details-routing.module';

import { AdvantageDetailsPage } from './advantage-details.page';
import { ShareModule } from '../share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdvantageDetailsPageRoutingModule,
    ShareModule
  ],
  declarations: [AdvantageDetailsPage]
})
export class AdvantageDetailsPageModule {}
