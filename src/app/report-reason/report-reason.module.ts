import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportReasonPageRoutingModule } from './report-reason-routing.module';

import { ReportReasonPage } from './report-reason.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportReasonPageRoutingModule
  ],
  declarations: [ReportReasonPage]
})
export class ReportReasonPageModule {}
