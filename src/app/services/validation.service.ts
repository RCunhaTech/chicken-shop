import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../models/Order';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
/*
  enableButton =new BehaviorSubject(true)
  erroValidate = new BehaviorSubject('')
  

  constructor(private stateService:StateService) { }

  validate(order:Order):void {
    const orderValidate =new BehaviorSubject(order).getValue()
    let totalChicken = this.stateService.quantityChicken.getValue()
    if(!orderValidate.payment) {
      this.erroValidate.next('INSIRA A FORMA  DE PAGAMENTO')
      this.enableButton.next(true)
      return 
    }

    if(!orderValidate.quantity) {
      this.erroValidate.next('INFORME A QUANTIDADE')
      this.enableButton.next(true)
      return 
    }

    const isString =new RegExp(/^[1-9]+$/)
    if(!isString.test(String(orderValidate.quantity))) {
      this.erroValidate.next('INFORME UM NÚMERO INTEIRO E MAIOR QUE ZERO')
      this.enableButton.next(true)
      return 
    }

    if(orderValidate.total <= 0) {
      this.erroValidate.next('CAMPO TOTAL INVÁLIDO, Verifique em opções se o preço do frango está correto')
      this.enableButton.next(true)
      return 
    }

    if(totalChicken === 0) {
      this.erroValidate.next('O ESTOQUE DE FRANGO ZEROU')
      this.enableButton.next(true)
      return
    }

    if(orderValidate.quantity > totalChicken) {
      this.erroValidate.next('A QUANTIDADE É MAIOR QUE O ESTOQUE')
      this.enableButton.next(true)
      return
    }

    this.erroValidate.next(`UN: ${orderValidate.quantity} - FRANGO ASSADO - PREÇO: ${orderValidate.price}`)
    this.enableButton.next(false)
  }
  */
}

