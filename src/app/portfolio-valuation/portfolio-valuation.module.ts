import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PortfolioValuationPageRoutingModule } from './portfolio-valuation-routing.module';

import { PortfolioValuationPage } from './portfolio-valuation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PortfolioValuationPageRoutingModule
  ],
  declarations: [PortfolioValuationPage]
})
export class PortfolioValuationPageModule {}
