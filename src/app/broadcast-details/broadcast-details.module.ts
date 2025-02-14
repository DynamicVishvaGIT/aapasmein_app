import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BroadcastDetailsPageRoutingModule } from './broadcast-details-routing.module';

import { BroadcastDetailsPage } from './broadcast-details.page';
import { ShareModule } from '../share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BroadcastDetailsPageRoutingModule,
    ShareModule
  ],
  declarations: [BroadcastDetailsPage]
})
export class BroadcastDetailsPageModule {}
