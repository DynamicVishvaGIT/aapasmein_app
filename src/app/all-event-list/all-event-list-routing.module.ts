import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllEventListPage } from './all-event-list.page';

const routes: Routes = [
  {
    path: '',
    component: AllEventListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllEventListPageRoutingModule {}
