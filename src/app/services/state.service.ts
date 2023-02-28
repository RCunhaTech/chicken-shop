import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  key:string ='@chicken.quantity.start'
  quantityChicken =new BehaviorSubject(this.convertInt()) 
  priceChicken =new BehaviorSubject(Number(localStorage.getItem('@chicken.price')))
  headerReceipt =new BehaviorSubject(localStorage.getItem('@chicken.receipt.header'))
  footerReceipt =new BehaviorSubject(localStorage.getItem('@chicken.receipt.footer'))
  printIf = new BehaviorSubject(this.convertBoolean())
  theme = new BehaviorSubject(localStorage.getItem('@chicken.theme'))
  constructor() { }

  reset() {
    this.save(0)
    this.quantityChicken.next(0)
  }

  creditValueChicken(quantity:number) {
    const amount =Number(this.quantityChicken.getValue()) || 0
    const newQuantity =this.credit(amount,quantity)
    this.save(newQuantity)
    this.quantityChicken.next(newQuantity)
  }

  debitValueChicken(quantity:number) {
    if(this.debitIf(quantity)) {
      const amount =Number(this.quantityChicken.getValue()) || 0
      const newQuantity =this.debit(amount,quantity)
      this.save(newQuantity)
      this.quantityChicken.next(newQuantity)
    }
  }

  private debitIf(newQuantity:number):boolean {
    const quantityChicken = Number(this.quantityChicken.getValue())
    return ((quantityChicken > 0) && (newQuantity <= quantityChicken))  ? true  : false
  }
  
  save(value:any,key:string =this.key) {
    localStorage.setItem(key,value)
  }

  private convertInt():number {
    let totalInt =Number(localStorage.getItem(this.key))
    return totalInt
  }

  convertBoolean():boolean {
    let print = localStorage.getItem('@chicken.confirm.print')
    if(print === null) {
      return true
    }else {
      return (/true/i).test(print)  === true ? true : false
    }
  }

  private credit(a:number,b:number):number {
    return Number(a) + Number(b)
  }

  private debit(a:number,b:number):number {
    return Number(a) - Number(b)
  }
}
