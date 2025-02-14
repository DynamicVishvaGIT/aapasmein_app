import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventCategoryPageRoutingModule } from './event-category-routing.module';

import { EventCategoryPage } from './event-category.page';
import { ShareModule } from '../share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventCategoryPageRoutingModule,
    ShareModule
  ],
  declarations: [EventCategoryPage]
})
export class EventCategoryPageModule {}
