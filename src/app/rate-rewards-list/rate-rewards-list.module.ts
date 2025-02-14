import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RateRewardsListPageRoutingModule } from './rate-rewards-list-routing.module';

import { RateRewardsListPage } from './rate-rewards-list.page';
import { ShareModule } from '../share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RateRewardsListPageRoutingModule,
    ShareModule
  ],
  declarations: [RateRewardsListPage]
})
export class RateRewardsListPageModule {}
