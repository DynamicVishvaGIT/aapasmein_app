import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllEventListPageRoutingModule } from './all-event-list-routing.module';

import { AllEventListPage } from './all-event-list.page';
import { ShareModule } from '../share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllEventListPageRoutingModule,
    ShareModule
  ],
  declarations: [AllEventListPage]
})
export class AllEventListPageModule {}
