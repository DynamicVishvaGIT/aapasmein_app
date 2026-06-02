import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationConveniencePageRoutingModule } from './notification-convenience-routing.module';

import { NotificationConveniencePage } from './notification-convenience.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationConveniencePageRoutingModule
  ],
  declarations: [NotificationConveniencePage]
})
export class NotificationConveniencePageModule {}
