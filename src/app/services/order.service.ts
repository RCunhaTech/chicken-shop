import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Order } from "../models/Order";
import { StateService } from "./state.service";

@Injectable({
    providedIn:'root'
})
export class OrderService  {

    key:string ='@chicken.orders'
    stringOrdersLocalStorage =localStorage.getItem(this.key)
    displayListOrders =new BehaviorSubject(false)
    ordersCount = new BehaviorSubject(0)
    paymentPending = new BehaviorSubject(0)
    paymentMoney =new BehaviorSubject(0)
    paymentCard =new BehaviorSubject(0)
    paymentPix =new BehaviorSubject(0)
    paymentTotal = new BehaviorSubject(0)
    order =new BehaviorSubject<Order[]>([])
    orders:Order[] =[]

    constructor(private stateService:StateService) { 
        this.order =new BehaviorSubject<Order[]>(this.localStorageOrders())
        setTimeout(() => {
            this.order.getValue().length > 0 ? this.displayListOrders.next(true) : this.displayListOrders.next(false)
            this.updatePayments()
        },100)
    }

    private localStorageOrders() {
        return this.orders = this.stringOrdersLocalStorage ? JSON.parse(this.stringOrdersLocalStorage) : []
    }

    getOrders():Observable<Order[]> {      
        return this.order.asObservable()
    }

    updatePayments() {
        this.countOrders()
        this.paymentMoney.next(this.amountPaymentMoney())
        this.paymentCard.next(this.amountPaymentCard())
        this.paymentPending.next(this.amountPaymentpending())
        this.paymentPix.next(this.amountPaymentPix())
        this.paymentTotal.next(this.amountPaymentTotal())
    }

    countOrders():void {
        this.ordersCount.next(this.orders.length)
    }

    amountPaymentMoney():number {
        return this.orders.filter((p:Order) => p.payment === 'dinheiro').reduce((sum, r) => sum += r.total ,0);
    }

    amountPaymentCard():number {
        return this.orders.filter((p:Order) => p.payment === 'cartao').reduce((sum, r) => sum += r.total ,0);
    }

    amountPaymentPix():number {
        return this.orders.filter((p:Order) => p.payment === 'pix').reduce((sum, r) => sum += r.total ,0);
    }

    amountPaymentpending():number {
        return this.orders.filter((p:Order) => p.payment === 'pendente').reduce((sum, r) => sum += r.total ,0);
    }

    amountPaymentTotal():number {
       return this.orders.reduce((sum, r) => sum += r.total ,0);
    }

    create(order:Order):void {
        if(this.orders.length === 0) {
            this.orders.push(order)
            this.save(this.orders)
        } else {
            this.orders = [...this.orders,order]
            this.orders.sort(this.descendingDate)
            this.save(this.orders)  
        }
        this.updatePayments()
        this.displayListOrders.next(true)
        //this.stateService.debitValueChicken(Number(order.quantity))
    }

    cancelOrder(Order:Order):boolean {
        this.orders.splice(this.orders.findIndex(r => r.created === Order.created),1)
        setTimeout(() => {
            this.save(this.orders)
            //this.stateService.creditValueChicken(Number(Order.quantity))
        },200)
        return true
    }

    clearOrders():void {
        this.order.next([])
        this.orders =[]
        this.displayListOrders.next(false)
        localStorage.removeItem(this.key)
        this.stateService.reset()
    }

    private save(orders:Order[]):void {
        this.order.next(this.orders)
        localStorage.setItem(this.key,JSON.stringify(orders))
    }

    private descendingDate(a:Order, b:Order) {
        return a.created < b.created ? 1 : a.created > b.created ? -1 : 0
    }
}


