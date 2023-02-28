import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Order } from '../models/Order';
import { OrderService } from '../services/order.service';
import { optionsMenu } from './options.menu';

@Component({
  selector: 'app-invoiced',
  templateUrl: 'invoiced.page.html',
  styleUrls: ['invoiced.page.scss']
})
export class InvoicedPage {

  clearList = this.orderService.displayListOrders.asObservable()
  payMoney =this.orderService.paymentMoney.asObservable()
  order:Order | any
  orders:Observable<Order[]> =this.orderService.order.asObservable()
  constructor(
    public orderService:OrderService,
    private actionSheetCtrl:ActionSheetController
  ) {}

  ngOnInit(): void {

  }

  private cancel(order:Order):void {
    const cancel =this.orderService.cancelOrder(order) 
    if(cancel) {

    }
  }

  async openMenu(order:Order) {
    const menu = await this.actionSheetCtrl.create(optionsMenu)
    await menu.present()
    menu.onDidDismiss().then((v) => {
      if(v.data.action === 'cancel-order') {
        this.cancel(order)
      }
    })
  }
}
