import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationConveniencePage } from './notification-convenience.page';

const routes: Routes = [
  {
    path: '',
    component: NotificationConveniencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationConveniencePageRoutingModule {}
