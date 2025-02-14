import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcceptRequestPageRoutingModule } from './accept-request-routing.module';

import { AcceptRequestPage } from './accept-request.page';
import { ShareModule } from '../share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcceptRequestPageRoutingModule,
    ShareModule
  ],
  declarations: [AcceptRequestPage]
})
export class AcceptRequestPageModule {}
