import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TabProductPageRoutingModule } from './tab-product-routing.module';
import { TabProductPage } from './tab-product.page';
import { FormProductComponentModule } from '../components/product/form/form.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabProductPageRoutingModule,
    FormProductComponentModule,
  ],
  declarations: [TabProductPage],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt',
    },
    {
      provide:  DEFAULT_CURRENCY_CODE,
      useValue: 'BRL'
    },
    CurrencyPipe
  ]
})
export class TabProductPageModule {}
