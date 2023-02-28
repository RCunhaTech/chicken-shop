import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { map } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  products = this.productService.productsLocalStorage.asObservable()
  @ViewChild('input') searchInput:any
  constructor(
    public productService:ProductService,
    private modalCtrl:ModalController
  ) { }

  ngOnInit() { 

    console.log(123);
    
    setTimeout(() => {
      this.searchInput.setFocus()
      this.productService.products =[]
    },200)
  }

  search(event: any) {
    const query = event.target.value.toLowerCase();
    this.products =this.productService.productsLocalStorage
    .pipe(map(r => r.filter(v => v.description.toLocaleLowerCase().indexOf(query)> -1)))
  }

  close() {
    this.modalCtrl.dismiss()
  }

  getProduct(product:Product) {
    this.productService.products.push(product)
    setTimeout(() => {this.close()},100)
  }

  @HostListener('window:keyup', ['$event'])
  select(e: KeyboardEvent) {
    console.log(e.key);
    if(e.key ==='Enter'){
      this.products.subscribe((products:Product[]) => {
        if(products.length === 1) {
          console.log(products[0]);
          this.productService.products =products
        }
        
      })
      setTimeout(() => {
        this.close()
      }, (200));
    }
  }
}
