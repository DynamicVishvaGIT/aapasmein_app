import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportReasonPage } from './report-reason.page';

const routes: Routes = [
  {
    path: '',
    component: ReportReasonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportReasonPageRoutingModule {}
