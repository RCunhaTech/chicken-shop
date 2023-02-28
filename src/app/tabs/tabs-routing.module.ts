import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'chicken',
    component: TabsPage,
    children: [
      {
        path: 'cart',
        loadChildren: () => import('../tabCart/cart.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'invoiced',
        loadChildren: () => import('../tabInvoiced/invoiced.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'product',
        loadChildren: () => import('../tab-product/tab-product.module').then(m => m.TabProductPageModule)
      },
      {
        path: 'options',
        loadChildren: () => import('../tabOptions/options.module').then(m => m.Tab3PageModule)
      },
      {
        path: '',
        redirectTo: '/chicken/cart',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/chicken/cart',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
