import { IonicModule } from '@ionic/angular';
import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InvoicedPage } from './invoiced.page';
import { InvoicedPageRoutingModule } from './invoiced-routing.module';
import { InvoicedCardComponentModule } from '../components/invoiced-card/invoiced-card.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    InvoicedCardComponentModule,
    InvoicedPageRoutingModule
  ],
  declarations: [InvoicedPage],
  providers: [
    {
      provide:  DEFAULT_CURRENCY_CODE,
      useValue: 'BRL'
    },
  ]
})
export class Tab2PageModule {}
