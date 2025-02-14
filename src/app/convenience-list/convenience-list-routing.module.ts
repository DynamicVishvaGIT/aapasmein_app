import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConvenienceListPage } from './convenience-list.page';

const routes: Routes = [
  {
    path: '',
    component: ConvenienceListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConvenienceListPageRoutingModule {}
