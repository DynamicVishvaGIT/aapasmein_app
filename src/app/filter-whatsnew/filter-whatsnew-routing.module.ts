import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilterWhatsnewPage } from './filter-whatsnew.page';

const routes: Routes = [
  {
    path: '',
    component: FilterWhatsnewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilterWhatsnewPageRoutingModule {}
