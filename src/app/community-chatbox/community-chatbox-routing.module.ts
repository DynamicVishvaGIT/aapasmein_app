import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommunityChatboxPage } from './community-chatbox.page';

const routes: Routes = [
  {
    path: '',
    component: CommunityChatboxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunityChatboxPageRoutingModule {}
