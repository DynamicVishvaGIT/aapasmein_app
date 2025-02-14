import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AapasmeinFeaturesPageRoutingModule } from './aapasmein-features-routing.module';

import { AapasmeinFeaturesPage } from './aapasmein-features.page';
import { ShareModule } from '../share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AapasmeinFeaturesPageRoutingModule,
    ShareModule
  ],
  declarations: [AapasmeinFeaturesPage]
})
export class AapasmeinFeaturesPageModule {}
