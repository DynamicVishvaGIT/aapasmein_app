import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddConveniencePageRoutingModule } from './add-convenience-routing.module';

import { AddConveniencePage } from './add-convenience.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddConveniencePageRoutingModule
  ],
  declarations: [AddConveniencePage]
})
export class AddConveniencePageModule {}
