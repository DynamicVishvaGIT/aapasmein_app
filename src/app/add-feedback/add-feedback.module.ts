import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddFeedbackPageRoutingModule } from './add-feedback-routing.module';

import { AddFeedbackPage } from './add-feedback.page';
import { ShareModule } from '../share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddFeedbackPageRoutingModule,
    ShareModule
  ],
  declarations: [AddFeedbackPage]
})
export class AddFeedbackPageModule {}
