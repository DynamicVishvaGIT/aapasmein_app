import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BroadcastListPageRoutingModule } from './broadcast-list-routing.module';

import { BroadcastListPage } from './broadcast-list.page';
import { ShareModule } from '../share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BroadcastListPageRoutingModule,
    ShareModule
  ],
  declarations: [BroadcastListPage]
})
export class BroadcastListPageModule {}
