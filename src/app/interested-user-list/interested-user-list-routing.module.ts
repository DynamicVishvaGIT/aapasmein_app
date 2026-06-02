import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InterestedUserListPage } from './interested-user-list.page';

const routes: Routes = [
  {
    path: '',
    component: InterestedUserListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InterestedUserListPageRoutingModule {}
