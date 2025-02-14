import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClarityListPage } from './clarity-list.page';

const routes: Routes = [
  {
    path: '',
    component: ClarityListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClarityListPageRoutingModule {}
