import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YellowpagesPageRoutingModule } from './yellowpages-routing.module';

import { YellowpagesPage } from './yellowpages.page';
import { ShareModule } from '../share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    YellowpagesPageRoutingModule,
    ShareModule
  ],
  declarations: [YellowpagesPage]
})
export class YellowpagesPageModule {}
