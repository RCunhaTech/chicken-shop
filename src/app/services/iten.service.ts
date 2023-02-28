import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Iten } from "../models/Iten";
import { Order } from "../models/Order";
import { ProductService } from "./product.service";

@Injectable({
    providedIn:'root'
})
export class ItenService  {

    total = new BehaviorSubject(0)
    itens =new BehaviorSubject<Iten[]>([])
    productList:Iten[] =[]

    constructor(
        private productService:ProductService
    ) { }

    create(iten:Iten):boolean {
        if(this.productList.length === 0) {
            this.productList.push(iten)
            this.itens.next(this.productList)
        } else {
            this.productList = [...this.productList,iten]
            this.itens.next(this.productList)
            this.productList.sort(this.descendingDate)
        }
        this.productService.decreaseStock(iten.uuid,iten.quantity)
        this.total.next(this.total.getValue() + iten.total)
        return true
    }

    cancelIten(iten:Iten):boolean {
        this.productService.increaseStock(iten.uuid,iten.quantity)
        this.productList.splice(this.productList.findIndex((_iten:Iten) => _iten.time === iten.time),1)
        this.total.next(this.total.getValue() - iten.total)
        return true
    }

    cancelAll(): boolean {
        this.productList.map((iten:Iten) => {
            this.productService.increaseStock(iten.uuid,iten.quantity)
        })
        return this.reset()
    }

    reset():boolean {
        this.productList =[]
        this.itens.next([])
        this.total.next(0)
        return true
    }
    
    private descendingDate(a:Iten, b:Iten): 0 | 1 | -1 {
        return a.time < b.time ? 1 : a.time > b.time ? -1 : 0
    }
}


