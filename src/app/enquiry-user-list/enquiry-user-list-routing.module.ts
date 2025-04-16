import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnquiryUserListPage } from './enquiry-user-list.page';

const routes: Routes = [
  {
    path: '',
    component: EnquiryUserListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnquiryUserListPageRoutingModule {}
