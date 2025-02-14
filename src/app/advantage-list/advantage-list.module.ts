import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdvantageListPageRoutingModule } from './advantage-list-routing.module';

import { AdvantageListPage } from './advantage-list.page';
import { ShareModule } from '../share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdvantageListPageRoutingModule,
    ShareModule
  ],
  declarations: [AdvantageListPage]
})
export class AdvantageListPageModule {}
