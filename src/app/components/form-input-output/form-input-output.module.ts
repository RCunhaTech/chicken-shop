import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormInputOutputComponent } from './form-input-output.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [FormInputOutputComponent],
  exports: [FormInputOutputComponent]
})
export class FormInputOutputComponentModule {}