import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddRateRewardsPage } from './add-rate-rewards.page';

const routes: Routes = [
  {
    path: '',
    component: AddRateRewardsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddRateRewardsPageRoutingModule {}
