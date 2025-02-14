import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AapasmeinAccoladesPage } from './aapasmein-accolades.page';

const routes: Routes = [
  {
    path: '',
    component: AapasmeinAccoladesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AapasmeinAccoladesPageRoutingModule {}
