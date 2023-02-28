import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabProductPage } from './tab-product.page';

const routes: Routes = [
  {
    path: '',
    component: TabProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabProductPageRoutingModule {}
