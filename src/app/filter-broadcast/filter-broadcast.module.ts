import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilterBroadcastPageRoutingModule } from './filter-broadcast-routing.module';

import { FilterBroadcastPage } from './filter-broadcast.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilterBroadcastPageRoutingModule
  ],
  declarations: [FilterBroadcastPage]
})
export class FilterBroadcastPageModule {}
