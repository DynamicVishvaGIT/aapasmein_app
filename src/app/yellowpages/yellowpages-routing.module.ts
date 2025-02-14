import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YellowpagesPage } from './yellowpages.page';

const routes: Routes = [
  {
    path: '',
    component: YellowpagesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YellowpagesPageRoutingModule {}
