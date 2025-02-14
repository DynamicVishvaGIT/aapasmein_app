import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdvertingPage } from './adverting.page';

const routes: Routes = [
  {
    path: '',
    component: AdvertingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvertingPageRoutingModule {}
