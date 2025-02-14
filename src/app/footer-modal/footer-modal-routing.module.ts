import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FooterModalPage } from './footer-modal.page';

const routes: Routes = [
  {
    path: '',
    component: FooterModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FooterModalPageRoutingModule {}
