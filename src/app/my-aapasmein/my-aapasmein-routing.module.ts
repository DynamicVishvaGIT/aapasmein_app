import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyAapasmeinPage } from './my-aapasmein.page';

const routes: Routes = [
  {
    path: '',
    component: MyAapasmeinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyAapasmeinPageRoutingModule {}
