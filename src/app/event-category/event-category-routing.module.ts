import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventCategoryPage } from './event-category.page';

const routes: Routes = [
  {
    path: '',
    component: EventCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventCategoryPageRoutingModule {}
