import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GlobalsearchPageRoutingModule } from './globalsearch-routing.module';

import { GlobalsearchPage } from './globalsearch.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GlobalsearchPageRoutingModule
  ],
  declarations: [GlobalsearchPage]
})
export class GlobalsearchPageModule {}
