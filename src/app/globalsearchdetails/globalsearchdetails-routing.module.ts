import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GlobalsearchdetailsPage } from './globalsearchdetails.page';

const routes: Routes = [
  {
    path: '',
    component: GlobalsearchdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GlobalsearchdetailsPageRoutingModule {}
