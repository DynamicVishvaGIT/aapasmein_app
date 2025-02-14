import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilterWhatsnewPageRoutingModule } from './filter-whatsnew-routing.module';

import { FilterWhatsnewPage } from './filter-whatsnew.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilterWhatsnewPageRoutingModule
  ],
  declarations: [FilterWhatsnewPage]
})
export class FilterWhatsnewPageModule {}
