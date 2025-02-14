import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddbroadcastPage } from './addbroadcast.page';

const routes: Routes = [
  {
    path: '',
    component: AddbroadcastPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddbroadcastPageRoutingModule {}
