import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConnectionListPageRoutingModule } from './connection-list-routing.module';

import { ConnectionListPage } from './connection-list.page';
import { ShareModule } from '../share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConnectionListPageRoutingModule,
    ShareModule
  ],
  declarations: [ConnectionListPage]
})
export class ConnectionListPageModule {}
