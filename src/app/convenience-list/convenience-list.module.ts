import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConvenienceListPageRoutingModule } from './convenience-list-routing.module';

import { ConvenienceListPage } from './convenience-list.page';
import { ShareModule } from '../share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConvenienceListPageRoutingModule,
    ShareModule
  ],
  declarations: [ConvenienceListPage]
})
export class ConvenienceListPageModule {}
