import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AapasmeinUnwindPage } from './aapasmein-unwind.page';

const routes: Routes = [
  {
    path: '',
    component: AapasmeinUnwindPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AapasmeinUnwindPageRoutingModule {}
