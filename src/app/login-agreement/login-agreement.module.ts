import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginAgreementPageRoutingModule } from './login-agreement-routing.module';

import { LoginAgreementPage } from './login-agreement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginAgreementPageRoutingModule
  ],
  declarations: [LoginAgreementPage]
})
export class LoginAgreementPageModule {}
