import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilterBroadcastPage } from './filter-broadcast.page';

const routes: Routes = [
  {
    path: '',
    component: FilterBroadcastPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilterBroadcastPageRoutingModule {}
