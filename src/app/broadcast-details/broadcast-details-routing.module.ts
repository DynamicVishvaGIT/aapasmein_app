import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BroadcastDetailsPage } from './broadcast-details.page';

const routes: Routes = [
  {
    path: '',
    component: BroadcastDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BroadcastDetailsPageRoutingModule {}
