import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddmallPageRoutingModule } from './addmall-routing.module';

import { AddmallPage } from './addmall.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddmallPageRoutingModule
  ],
  declarations: [AddmallPage]
})
export class AddmallPageModule {}
