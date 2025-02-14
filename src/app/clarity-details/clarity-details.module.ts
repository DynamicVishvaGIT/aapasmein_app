import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClarityDetailsPageRoutingModule } from './clarity-details-routing.module';

import { ClarityDetailsPage } from './clarity-details.page';
import { ShareModule } from '../share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClarityDetailsPageRoutingModule,
    ShareModule
  ],
  declarations: [ClarityDetailsPage]
})
export class ClarityDetailsPageModule {}
