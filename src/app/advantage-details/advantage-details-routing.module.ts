import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdvantageDetailsPage } from './advantage-details.page';

const routes: Routes = [
  {
    path: '',
    component: AdvantageDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvantageDetailsPageRoutingModule {}
