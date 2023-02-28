import { IonicModule } from '@ionic/angular';
import { NgModule, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OptionsPage } from './options.page';
import { OptionsPageRoutingModule } from './options-routing.module';
import { TotalStatusComponentModule } from '../components/total-status/total-status.module';
import { FormInputOutputComponentModule } from '../components/form-input-output/form-input-output.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TotalStatusComponentModule,
    FormInputOutputComponentModule,
    OptionsPageRoutingModule
  ],
  declarations: [OptionsPage],
  providers: [
    {
      provide:  DEFAULT_CURRENCY_CODE,
      useValue: 'BRL'
    },
  ]
})
export class Tab3PageModule {}
