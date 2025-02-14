import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddbroadcastPageRoutingModule } from './addbroadcast-routing.module';

import { AddbroadcastPage } from './addbroadcast.page';
import { ShareModule } from '../share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddbroadcastPageRoutingModule,
    ShareModule
  ],
  declarations: [AddbroadcastPage]
})
export class AddbroadcastPageModule {}
