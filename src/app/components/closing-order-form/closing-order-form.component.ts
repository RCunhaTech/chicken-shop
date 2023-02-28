import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { IonRadio, IonRadioGroup, ModalController, NavParams } from '@ionic/angular';
import { Order } from 'src/app/models/Order';
import { OrderService } from '../../services/order.service'

@Component({
  selector: 'app-closing-order-form',
  templateUrl: './closing-order-form.component.html',
  styleUrls: ['./closing-order-form.component.scss'],
})
export class ClosingOrderFormComponent implements OnInit {

  payment:string =''
  printOrder:boolean =false
  loadSpinner:boolean =false
  printLabel:string ='Não Imprimir Nota'
  order:Order = new Order()
  cash:number =0
  constructor(
    private modalCtrl:ModalController,
    private parans: NavParams,
    private orderService:OrderService
  ) 
  {
    this.order = this.parans.get('order') || new Order()
  }

  ngOnInit() {
    setTimeout(() => {
      this.payment ='dinheiro'
    },200)
  }

  selectPayment(event:any) {
    const val = event.target.value
    this.order.payment =this.payment  
  }

  changeImage() {
    switch(this.payment) {
      case 'dinheiro': { return '../../../assets/money256.png' }
      case 'cartao-credito': { return '../../../assets/credit256.png' }
      case 'cartao-debito': { return '../../../assets/debit256.png' }
      case 'pix': { return '../../../assets/pix256.png' }
      default : { return }
    }
  }

  returnCash(event:any) {
    const pay = +event.target.value
    const { total } =this.order
    return ((total > 0) && (pay > 0)&& (pay > total)) ? this.cash = (Number(pay) - Number(total)) : this.cash = 0
  }

  closeModal() {
    this.modalCtrl.dismiss()
  }

  enablePrint() {
    switch(this.printOrder) {
      case false: {
        this.printOrder =true
        this.printLabel ='Imprimir Nota'
        break
      }
      case true: {
        this.printOrder =false
        this.printLabel ='Não Imprimir Nota'
        break
      }
    }
  }

  finalizeOrder() {
    this.order.payment =this.payment
    //this.orderService.create(this.order)
    this.loadSpinner =true
    setTimeout(() => {
      this.closeModal()
    },1000)

    
    if(this.printOrder) {
      //print note
    }
  }

  @HostListener('window:keyup', ['$event'])
  open(e: KeyboardEvent) {
    console.log(e.key);
    switch(e.key) {
      case 'p' : { this.payment ='pix'; break }
      case 'd' : { this.payment ='cartao-debito';break }
      case 'c' : { this.payment ='cartao-credito';break }
      case 'm' : { this.payment = 'dinheiro'; break }
      case 'i' : { this.enablePrint();break }
      case 'Enter' : { this.finalizeOrder();break }
    }
  }

}