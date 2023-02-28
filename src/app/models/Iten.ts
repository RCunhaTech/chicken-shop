import { Product } from "./Product"

export class Iten {
    uuid:string=''
    description:string=''
    quantity:number =1
    price:number =0
    percentage:number =0
    discount:number =0
    total:number =0
    time:string = new Date().toLocaleTimeString()

    load(product:Product,iten:Iten):Iten {
        this.uuid = product.uuid
        this.description = product.description
        this.quantity = iten.quantity
        this.percentage = iten.percentage
        this.price = product.price
        this.calculateTotal()
        return this
    }

    calculateTotal() {
        if(this.percentage > 0) {
            const d = (this.percentage * this.price) / 100
            this.discount = +d.toFixed(2)
            this.total = +(Number(this.price) - Number(this.discount.toFixed(2))) * this.quantity
        } else {
            this.total = (Number(this.price) * Number(this.quantity))
        }
    }

    arredonda(numero:any, casasDecimais:any) {
        casasDecimais = typeof casasDecimais !== 'undefined' ?  casasDecimais : 2;
        return +(Math.floor(numero =(casasDecimais)) + ( casasDecimais));
    }
}