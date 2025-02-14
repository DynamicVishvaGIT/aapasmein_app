import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddRateRewardsPageRoutingModule } from './add-rate-rewards-routing.module';

import { AddRateRewardsPage } from './add-rate-rewards.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddRateRewardsPageRoutingModule
  ],
  declarations: [AddRateRewardsPage]
})
export class AddRateRewardsPageModule {}
