import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommunityChatboxPageRoutingModule } from './community-chatbox-routing.module';

import { CommunityChatboxPage } from './community-chatbox.page';
import { ShareModule } from '../share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommunityChatboxPageRoutingModule,
    ShareModule
  ],
  declarations: [CommunityChatboxPage]
})
export class CommunityChatboxPageModule {}
