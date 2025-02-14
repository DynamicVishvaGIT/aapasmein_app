import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestSendPage } from './request-send.page';

const routes: Routes = [
  {
    path: '',
    component: RequestSendPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestSendPageRoutingModule {}
