import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddmallPage } from './addmall.page';

const routes: Routes = [
  {
    path: '',
    component: AddmallPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddmallPageRoutingModule {}
