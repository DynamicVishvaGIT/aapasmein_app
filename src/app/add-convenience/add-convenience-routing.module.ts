import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddConveniencePage } from './add-convenience.page';

const routes: Routes = [
  {
    path: '',
    component: AddConveniencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddConveniencePageRoutingModule {}
