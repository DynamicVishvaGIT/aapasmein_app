import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClarityListPageRoutingModule } from './clarity-list-routing.module';

import { ClarityListPage } from './clarity-list.page';
import { ShareModule } from '../share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClarityListPageRoutingModule,
    ShareModule
  ],
  declarations: [ClarityListPage]
})
export class ClarityListPageModule {}
