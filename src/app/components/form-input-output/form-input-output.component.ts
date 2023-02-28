import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { OrderService } from 'src/app/services/order.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-form-input-output',
  templateUrl: './form-input-output.component.html',
  styleUrls: ['./form-input-output.component.scss'],
})
export class FormInputOutputComponent implements OnInit {
  @ViewChild('autoFocus') element:any 
  @Input() action:boolean =false 
  labelButton:string =''
  labelTitle:string =''
  quantity?:any
  price:number =Number(localStorage.getItem('@cotacao'))
  constructor(
    private stateService:StateService,
    private orderService:OrderService
  ) { }

  ngOnInit() {
    this.action === true 
    if(this.action)
    this.labelButton ='creditar'
    this.labelTitle ='Informe a Quantidade'
    if(!this.action)
    this.labelButton ='Debitar'
    this.labelTitle ='Informe a Quantidade para Debitar'
  }

  ngAfterViewChecked() {
    setTimeout(() => {
      this.element.nativeElement.focus();
    },300)
  }

  createOrder():Order {
    const order = new Order()
    order.created =new Date().toLocaleTimeString()
    order.total =(this.quantity * this.price)
    return order
  }

  onSubmit() {
  
    if(this.action) {
      if(this.quantity)
      this.stateService.creditValueChicken(this.quantity)
    } else {
      if(this.quantity)
      this.stateService.debitValueChicken(this.quantity)
      const order = this.createOrder()
      this.orderService.create(order)
    }
    this.quantity =''
  }

}
