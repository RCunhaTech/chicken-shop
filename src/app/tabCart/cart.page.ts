import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OrderService } from '../services/order.service';
import { NgxPrintElementService } from 'ngx-print-element';
import { Order } from '../models/Order';
import { ProductService } from '../services/product.service';
import { Product } from '../models/Product';
import { MessageService } from '../services/message.service';
import { map } from 'rxjs';
import { Iten } from '../models/Iten';
import { ItenService } from '../services/iten.service';
import { ListComponent } from '../components/product/list/list.component';
import { ClosingOrderFormComponent } from '../components/closing-order-form/closing-order-form.component';

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.page.html',
  styleUrls: ['cart.page.scss']
})
export class CartPage implements OnInit {

  @ViewChild('input') inputCode: any
  @ViewChild('receipt') receipt: any = ElementRef
  @ViewChild('inputPercentage') inputPercentage: any

  enterCode: any
  onlyInstanceModal: boolean = true
  disableTable: boolean = true
  disableInput: boolean = true
  productsAsync = this.productService.productsLocalStorage.asObservable()
  itenAsync = this.itenService.itens.asObservable()
  productsMonitoring: Product[] = []
  order: Order = new Order()
  iten: Iten = new Iten()
  product: any

  constructor(
    private orderService: OrderService,
    public productService: ProductService,
    public messageSevice: MessageService,
    public itenService: ItenService,
    private printService: NgxPrintElementService,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.setMonitoring()
    }, 200)
  }

  setMonitoring() {
    this.productsAsync.subscribe((product: Product[]) => {
      this.productsMonitoring = product.filter((product: Product) => product.monitoring === true)
    })
  }

  search(event: any) {
    this.enterCode = event.target.value.toLowerCase();
    const isCode = new RegExp(/[0-9]{1,4}/)
    const isBarcode = new RegExp(/[0-9]{13}/)
    isBarcode.test(this.enterCode) ? this.makeSale(1) : this.makeSale(0)
  }

  makeSale(option: number) {
    option === 1 ? this.productsAsync = this.productService.productsLocalStorage.pipe(map(r => r.filter(v => v.barcode == this.enterCode)))
      : this.productsAsync = this.productService.productsLocalStorage.pipe(map(r => r.filter(v => v.code == this.enterCode)))
    this.productsAsync.subscribe((product) => {
      if (product.length === 1) {
        product.map((iten) => {
          this.verifyStock(iten)
        })
      }
    })
  }

  verifyStock(product: Product) {
    if (product.stock === 0) {
      this.messageSevice.danger('O Estoque do produto está zerado!')

    }
    if (product.stock < this.iten.quantity) {
      this.messageSevice.danger('A quantidade é maior que o estoque!', 'danger', 5000, 'center')
      return
    }
    this.newIten(product)
  }

  newIten(product: Product) {
    const iten = new Iten().load(product, this.iten)
    this.iten.price = iten.price
    this.iten.discount = iten.discount
    this.iten.total = iten.total
    if (this.disableInput === true) {
      if (this.itenService.create(iten)) {
        setTimeout(() => {
          this.enterCode = ''
          this.iten.quantity = 1
        }, 100)
      }
    }
  }

  calcelIten(iten: Iten) {
    this.messageSevice.remove(`${iten.description}`, 'Cancelar item?', 'NÃO').then((response) => {
      if (response) {
        this.itenService.cancelIten(iten)
      }
    })
  }

  offerDiscount() {
    this.disableInput = !this.disableInput
  }

  makeDiscount() {
    this.iten.calculateTotal()
  }

  @HostListener('window:keyup', ['$event'])
  open(e: KeyboardEvent) {
    e.key === "*" ? this.changeQuantity() : null
    e.key === "F4" ? this.startOrder() : null

    if((this.itenService.productList.length > 0) && (this.onlyInstanceModal)) {
      if(e.key === "F8" ) {
        this.finalizeOrder() 
        this.onlyInstanceModal =false
      }
    }
    
    if ((e.key === "F2") && (this.onlyInstanceModal)) {
      this.openModalSearch()
      this.onlyInstanceModal = false
    }
  }

  changeQuantity() {
    const v: any = this.enterCode
    const n = v.replace(/[^0-9]/g, '')
    if (n > 0) {
      this.iten.quantity = +n
      this.enterCode = ''
    }
  }

  startOrder() {
    this.disableTable = false
    if (this.disableTable === false) {
      this.inputCode.setFocus()
    }
  }

  finalizeOrder() {
    this.order.itens = this.itenService.itens.getValue()
    this.order.total = this.itenService.total.getValue()
    this.openModalClosingOrder()
  }

  async openModalSearch() {
    const modal = await this.modalCtrl.create({
      component: ListComponent,
      componentProps: { product: this.productService.products }
    })
    await modal.present()
    modal.onDidDismiss().then(() => {
      this.startOrder()
      this.onlyInstanceModal = true
      if (this.productService.products.length === 1) {
        const product = this.productService.products[0]
        this.newIten(product)
      }
    })
  }

  async openModalClosingOrder() {
    const modal = await this.modalCtrl.create({
      component: ClosingOrderFormComponent,
      componentProps: { order: this.order }
    })
    await modal.present()
    modal.onDidDismiss().then(() => {
      this.onlyInstanceModal = true
    })
  }

  private print() {
    this.printService.print(this.receipt.nativeElement.id)
    this.order = new Order()
  }
}
