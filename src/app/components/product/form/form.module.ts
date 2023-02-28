import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormComponent } from './form.component';
import { MessageComponentModule } from '../../message/message.module';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule,MessageComponentModule],
  declarations: [FormComponent],
  exports: [FormComponent]
})
export class FormProductComponentModule {}