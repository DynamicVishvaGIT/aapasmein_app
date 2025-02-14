import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WhatsnewListPage } from './whatsnew-list.page';

const routes: Routes = [
  {
    path: '',
    component: WhatsnewListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WhatsnewListPageRoutingModule {}
