import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConvenienceDetailsPageRoutingModule } from './convenience-details-routing.module';

import { ConvenienceDetailsPage } from './convenience-details.page';
import { ShareModule } from '../share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConvenienceDetailsPageRoutingModule,
    ShareModule
  ],
  declarations: [ConvenienceDetailsPage]
})
export class ConvenienceDetailsPageModule {}
