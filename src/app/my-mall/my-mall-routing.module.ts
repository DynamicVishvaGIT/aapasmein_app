import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyMallPage } from './my-mall.page';

const routes: Routes = [
  {
    path: '',
    component: MyMallPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyMallPageRoutingModule {}
