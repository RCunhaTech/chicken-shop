import { v4 as uuidv4 } from 'uuid';

export class Product {
    uuid:string =''
    code?:number
    barcode?:string
    monitoring:boolean=false
    shortName?:string
    description:string=''
    costPrice?:number 
    price:number=0
    stock:number =0
    lowStock:number =0
    badStock:number =0
    measure:string=''
    active:boolean =true
    stockStatus?:string
    created:string=''
    
    constructor() {}

    load = (product: Product): Product  => {
        this.uuid = uuidv4()
        this.code =product.code
        this.barcode =product.barcode
        this.monitoring =product.monitoring
        this.shortName =product.shortName
        this.description =product.description
        this.costPrice =product.costPrice
        this.price = product.price
        this.stock = product.stock
        this.lowStock = product.lowStock
        this.badStock =product.badStock
        this.measure =product.measure
        this.created =`${new Date().toLocaleDateString()}-${new Date().toLocaleTimeString()}`
        return this
    }
}