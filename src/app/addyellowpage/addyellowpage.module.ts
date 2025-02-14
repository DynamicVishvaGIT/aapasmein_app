import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddyellowpagePageRoutingModule } from './addyellowpage-routing.module';

import { AddyellowpagePage } from './addyellowpage.page';
import { ShareModule } from '../share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddyellowpagePageRoutingModule,
    ShareModule
  ],
  declarations: [AddyellowpagePage]
})
export class AddyellowpagePageModule {}
