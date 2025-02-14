import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WhatsnewListPageRoutingModule } from './whatsnew-list-routing.module';

import { WhatsnewListPage } from './whatsnew-list.page';
import { ShareModule } from '../share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WhatsnewListPageRoutingModule,
    ShareModule
  ],
  declarations: [WhatsnewListPage]
})
export class WhatsnewListPageModule {}
