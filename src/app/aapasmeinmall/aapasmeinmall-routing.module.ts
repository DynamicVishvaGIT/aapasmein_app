import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AapasmeinmallPage } from './aapasmeinmall.page';

const routes: Routes = [
  {
    path: '',
    component: AapasmeinmallPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AapasmeinmallPageRoutingModule {}
