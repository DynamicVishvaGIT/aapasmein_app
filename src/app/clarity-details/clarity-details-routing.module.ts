import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClarityDetailsPage } from './clarity-details.page';

const routes: Routes = [
  {
    path: '',
    component: ClarityDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClarityDetailsPageRoutingModule {}
