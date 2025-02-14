import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestSendPageRoutingModule } from './request-send-routing.module';

import { RequestSendPage } from './request-send.page';
import { ShareModule } from '../share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestSendPageRoutingModule,
    ShareModule
  ],
  declarations: [RequestSendPage]
})
export class RequestSendPageModule {}
