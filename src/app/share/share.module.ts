import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonfooterComponent } from '../commonfooter/commonfooter.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonsearchComponent } from '../commonsearch/commonsearch.component';
import { ConnectionComponent } from '../connection/connection.component';



@NgModule({
  declarations: [
    CommonfooterComponent,
    CommonsearchComponent,
    ConnectionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports:[
    CommonfooterComponent,
    CommonsearchComponent,
    ConnectionComponent
  ]
})
export class ShareModule { }
