import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AapasmeinFeaturesPage } from './aapasmein-features.page';

const routes: Routes = [
  {
    path: '',
    component: AapasmeinFeaturesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AapasmeinFeaturesPageRoutingModule {}
