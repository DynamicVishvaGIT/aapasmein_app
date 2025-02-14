import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilterMallPage } from './filter-mall.page';

const routes: Routes = [
  {
    path: '',
    component: FilterMallPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilterMallPageRoutingModule {}
