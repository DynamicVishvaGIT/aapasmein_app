import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddyellowpagePage } from './addyellowpage.page';

const routes: Routes = [
  {
    path: '',
    component: AddyellowpagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddyellowpagePageRoutingModule {}
