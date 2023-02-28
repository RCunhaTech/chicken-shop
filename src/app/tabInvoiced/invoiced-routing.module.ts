import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoicedPage } from './invoiced.page';

const routes: Routes = [
  {
    path: '',
    component: InvoicedPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicedPageRoutingModule {}
