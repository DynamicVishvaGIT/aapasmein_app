import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SavedItemsListPage } from './saved-items-list.page';

const routes: Routes = [
  {
    path: '',
    component: SavedItemsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavedItemsListPageRoutingModule {}
