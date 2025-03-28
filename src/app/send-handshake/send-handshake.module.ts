import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendHandshakePageRoutingModule } from './send-handshake-routing.module';

import { SendHandshakePage } from './send-handshake.page';
import { ShareModule } from '../share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendHandshakePageRoutingModule,
    ShareModule
  ],
  declarations: [SendHandshakePage]
})
export class SendHandshakePageModule {}
