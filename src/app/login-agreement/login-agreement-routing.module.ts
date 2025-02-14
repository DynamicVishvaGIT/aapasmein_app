import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginAgreementPage } from './login-agreement.page';

const routes: Routes = [
  {
    path: '',
    component: LoginAgreementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginAgreementPageRoutingModule {}
