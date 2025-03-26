import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyAapasmeinPageRoutingModule } from './my-aapasmein-routing.module';

import { MyAapasmeinPage } from './my-aapasmein.page';
import { ShareModule } from '../share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyAapasmeinPageRoutingModule,
    ShareModule
  ],
  declarations: [MyAapasmeinPage]
})
export class MyAapasmeinPageModule {}
