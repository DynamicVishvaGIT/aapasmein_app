import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RateRewardsListPage } from './rate-rewards-list.page';

const routes: Routes = [
  {
    path: '',
    component: RateRewardsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RateRewardsListPageRoutingModule {}
