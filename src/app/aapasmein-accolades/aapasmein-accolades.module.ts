import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AapasmeinAccoladesPageRoutingModule } from './aapasmein-accolades-routing.module';

import { AapasmeinAccoladesPage } from './aapasmein-accolades.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AapasmeinAccoladesPageRoutingModule
  ],
  declarations: [AapasmeinAccoladesPage]
})
export class AapasmeinAccoladesPageModule {}
