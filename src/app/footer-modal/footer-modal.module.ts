import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FooterModalPageRoutingModule } from './footer-modal-routing.module';

import { FooterModalPage } from './footer-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FooterModalPageRoutingModule
  ],
  declarations: [FooterModalPage]
})
export class FooterModalPageModule {}
