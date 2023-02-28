import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TotalStatusComponent } from './total-status.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [TotalStatusComponent],
  exports: [TotalStatusComponent]
})
export class TotalStatusComponentModule {}