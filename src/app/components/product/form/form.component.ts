import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {

  headerTitle:string =''
  viewSessionCode:boolean =true
  viewSessionMonitoring:boolean =true
  product:Product 

  constructor(
    public modalCtrl:ModalController,
    public productService:ProductService,
    public params:NavParams
  ) { this.product = new Product() }

  ngOnInit() {
    if(this.params.get('product') === undefined) {
      this.product = new Product() 
      this.headerTitle ='Cadastrar Produto'
    } else {
      this.product =this.params.get('product')
      this.headerTitle ='Alterar Produto'
    }
  }

  enableSessionCode() {
    this.viewSessionCode = !this.viewSessionCode
    this.viewSessionMonitoring =true
  }

  enableSessionMonitoring() {
    this.viewSessionMonitoring = !this.viewSessionMonitoring
    this.viewSessionCode =true
  }

  close() {
    this.modalCtrl.dismiss()
  }

  save() {
    this.viewSessionMonitoring =true
    this.viewSessionCode =true
    if(this.product.uuid === '') {
      const product =new Product().load(this.product)
      this.productService.create(product)
    } else {
      this.productService.update(this.product.uuid,this.product)
    }
  }

}
