import { IonicModule,NavParams } from '@ionic/angular';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule,CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartPage } from './cart.page';
import { CartPageRoutingModule } from './cart-routing.module';
import { TotalStatusComponentModule } from '../components/total-status/total-status.module';
import { ListProductComponentModule } from '../components/product/list/list.module';
import { ClosingOrderComponentModule } from '../components/closing-order-form/closing-order-form.mudule';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TotalStatusComponentModule,
    ListProductComponentModule,
    CartPageRoutingModule,
    ClosingOrderComponentModule
  ],
  declarations: [CartPage],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt',
    },
    {
      provide:  DEFAULT_CURRENCY_CODE,
      useValue: 'BRL'
    },
    CurrencyPipe,NavParams
  ]
})
export class Tab1PageModule {}
