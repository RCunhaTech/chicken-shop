import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InvoicedCardComponent } from './invoiced-card.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [InvoicedCardComponent],
  exports: [InvoicedCardComponent]
})
export class InvoicedCardComponentModule {}