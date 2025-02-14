import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingmodalPageRoutingModule } from './settingmodal-routing.module';

import { SettingmodalPage } from './settingmodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingmodalPageRoutingModule
  ],
  declarations: [SettingmodalPage]
})
export class SettingmodalPageModule {}
