import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShareModalPageRoutingModule } from './share-modal-routing.module';

import { ShareModalPage } from './share-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShareModalPageRoutingModule
  ],
  declarations: [ShareModalPage]
})
export class ShareModalPageModule {}
