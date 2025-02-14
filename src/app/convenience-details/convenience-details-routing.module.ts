import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConvenienceDetailsPage } from './convenience-details.page';

const routes: Routes = [
  {
    path: '',
    component: ConvenienceDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConvenienceDetailsPageRoutingModule {}
