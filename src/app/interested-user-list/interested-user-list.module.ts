import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InterestedUserListPageRoutingModule } from './interested-user-list-routing.module';

import { InterestedUserListPage } from './interested-user-list.page';
import { ShareModule } from '../share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InterestedUserListPageRoutingModule,
    ShareModule
  ],
  declarations: [InterestedUserListPage]
})
export class InterestedUserListPageModule {}
