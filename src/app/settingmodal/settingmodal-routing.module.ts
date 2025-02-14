import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingmodalPage } from './settingmodal.page';

const routes: Routes = [
  {
    path: '',
    component: SettingmodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingmodalPageRoutingModule {}
