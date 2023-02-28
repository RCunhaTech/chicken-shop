import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { map } from 'rxjs';
import { FormComponent } from '../components/product/form/form.component';
import { MessageService } from '../services/message.service';
import { ProductService } from '../services/product.service';
import * as bcrypt from "bcryptjs";
import { Product } from '../models/Product';
import { MenuItenProduct, MenuOptions } from './ActionSheetOptions'

@Component({
  selector: 'app-tab-product',
  templateUrl: './tab-product.page.html',
  styleUrls: ['./tab-product.page.scss'],
})
export class TabProductPage implements OnInit {

  tableGrid: boolean = false
  products = this.productService.productsLocalStorage.asObservable()

  constructor(
    public modalCtrl: ModalController,
    public productService: ProductService,
    public messageService: MessageService,
    private actionSheet: ActionSheetController
  ) { }

  changeTableOrGrid() {
    this.tableGrid = !this.tableGrid
  }

  ngOnInit(): void { }

  search(event: any) {
    const query = event.target.value.toLowerCase();
    this.products = this.productService.productsLocalStorage
      .pipe(map(r => r.filter(v => v.description.toLocaleLowerCase().indexOf(query) > -1)))
  }

  async openMenu(product?: Product) {
    const sheet = await this.actionSheet.create(product ? MenuItenProduct(product) : MenuOptions)
    await sheet.present()
    sheet.onDidDismiss().then((v) => {
      this.actionsMenu(v.data,product)
    })
  }

  actionsMenu(action:string,product?:Product) {
    switch(action) {
      case 'new': { this.openForm(); break }
      case 'view' : { this.openForm(product); break }
      case 'edit' : { this.openForm(product); break }
      case 'remove': { console.log('remover'); break }
      case 'lowstock' : { this.filter(action); break }
      case 'badstock' : { this.filter(action); break }
      case 'removefilter' : { this.filter(''); break }
    }
  }

  async openForm(product?: Product) {
    const modal = await this.modalCtrl.create({
      component: FormComponent,
      componentProps: { product }
    })
    await modal.present()
  }

  async delete(product: Product) {
    this.messageService.confirm(`Deseja remover: ${product.description} ?`).then((response) => {
      if (response === true) {
        this.messageService.secondary('Ação cancelada...')
      } else {
        if (this.validPassword(response.password)) {
          this.productService.delete(product.uuid)
          this.messageService.success('Produto removido com sucesso!')
        } else {
          this.messageService.warning('Senha Inválida...')
        }
      }
    })
  }

  validPassword(password: string): boolean {
    const hash: any = localStorage.getItem('@chicken.password')
    return bcrypt.compareSync(password, hash)
  }

  filter(status:string) {
    this.products = this.productService.productsLocalStorage
    .pipe(map(r => r.filter(v => v.stockStatus === undefined ? '' : v.stockStatus.toLocaleLowerCase().indexOf(status) > -1)))
  }
}
