import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Product } from "../models/Product";
import { MessageService } from "./message.service";

@Injectable({
    providedIn:'root'
})
export class ProductService  {

    key:string ='@chicken.products'
    stringOrdersLocalStorage =localStorage.getItem(this.key)

    displayListOrders =new BehaviorSubject(false)
    productsLocalStorage =new BehaviorSubject<Product[]>([])
    productMonitoring = new BehaviorSubject<Product[]>([])
    productsArrayList:Product[] =[]
    products:Product[] =[]
    
    constructor(private messageService:MessageService) { 
        this.productsLocalStorage =new BehaviorSubject<Product[]>(this.localStorageProducts())
    }

    private localStorageProducts() {
        return this.productsArrayList = this.stringOrdersLocalStorage ? JSON.parse(this.stringOrdersLocalStorage) : []
    }

    update(uuid:string,productUpdated:Product) {
        productUpdated.stockStatus =this.addAlertStock(productUpdated)
        const product:Product[]= this.productsArrayList.map((product:Product) => {
            return product.uuid === uuid ? {...product, ...productUpdated} : product 
        })
        this.save(product)
        this.messageService.sendMessage('Produto Atualizado com Sucesso!',2,'success')
    }

    create(product:Product):void {
        product.stockStatus =this.addAlertStock(product)
        if(this.productsArrayList.length ===0) {
            this.productsArrayList.push(product)
        } else {
            this.productsArrayList =[...this.productsArrayList,product]
            this.productsArrayList.sort(this.descendingDate)
        }
        this.save(this.productsArrayList)
        this.messageService.sendMessage('Produto Criado com Sucesso!',2,'success')
    }

    delete(uuid:string) {
        const index = this.productsArrayList.findIndex((product:Product) => product.uuid ===uuid)
        index === -1 ? this.messageService.danger('Produto não Encontrado!') :
        this.productsArrayList.splice(index,1) 
        this.save(this.productsArrayList)
        this.messageService.success('O Produto foi Removido com Sucesso!')
    }

    decreaseStock(uuid:string,quantityDecrease:number) {
        this.productsArrayList = this.productsArrayList.map((product:Product) => {
            if(product.uuid === uuid) {
                product.stock = (product.stock - quantityDecrease) 
                product.stockStatus = this.addAlertStock(product)
            }
            return product
        })
        this.save(this.productsArrayList,false)
    }

    increaseStock(uuid:string,quantityIncrease:number) {
        this.productsArrayList = this.productsArrayList.map((product:Product) => {
            if(product.uuid === uuid) {
                product.stock = (product.stock + quantityIncrease) 
                product.stockStatus = this.addAlertStock(product)
            }
            return product
        })
        this.save(this.productsArrayList,false)
    }

    addAlertStock(product:Product) {
        return Number(product.stock) <= Number(product.badStock) ? product.stockStatus ='badstock' : 
        Number(product.stock) <= Number(product.lowStock) ? product.stockStatus ='lowstock' : ''
    }


    private save(product:Product[],refresh:boolean=true):void {
        if(refresh) {
            this.productsLocalStorage.next(product)
            localStorage.setItem(this.key,JSON.stringify(product))
        } else {
            localStorage.setItem(this.key,JSON.stringify(product))
        }
    }

    private descendingDate(a:Product, b:Product) {
        return a.created < b.created ? 1 : a.created > b.created ? -1 : 0
    }
}


