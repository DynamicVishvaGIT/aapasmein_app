import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgreementTermsConditionsPageRoutingModule } from './agreement-terms-conditions-routing.module';

import { AgreementTermsConditionsPage } from './agreement-terms-conditions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgreementTermsConditionsPageRoutingModule
  ],
  declarations: [AgreementTermsConditionsPage]
})
export class AgreementTermsConditionsPageModule {}
