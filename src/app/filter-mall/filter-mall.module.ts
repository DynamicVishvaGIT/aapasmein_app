import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilterMallPageRoutingModule } from './filter-mall-routing.module';

import { FilterMallPage } from './filter-mall.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilterMallPageRoutingModule
  ],
  declarations: [FilterMallPage]
})
export class FilterMallPageModule {}
