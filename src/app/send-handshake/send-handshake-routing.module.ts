import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendHandshakePage } from './send-handshake.page';

const routes: Routes = [
  {
    path: '',
    component: SendHandshakePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendHandshakePageRoutingModule {}
