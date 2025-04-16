import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnquiryUserListPageRoutingModule } from './enquiry-user-list-routing.module';

import { EnquiryUserListPage } from './enquiry-user-list.page';
import { ShareModule } from '../share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnquiryUserListPageRoutingModule,
    ShareModule
  ],
  declarations: [EnquiryUserListPage]
})
export class EnquiryUserListPageModule {}
