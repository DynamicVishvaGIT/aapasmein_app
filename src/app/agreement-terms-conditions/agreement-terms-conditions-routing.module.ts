import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgreementTermsConditionsPage } from './agreement-terms-conditions.page';

const routes: Routes = [
  {
    path: '',
    component: AgreementTermsConditionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgreementTermsConditionsPageRoutingModule {}
