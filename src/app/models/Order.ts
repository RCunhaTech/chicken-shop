import { Iten } from "./Iten"

export class Order {
    created:string=`${new Date().toLocaleDateString()}-${new Date().toLocaleTimeString()}`
    itens:Iten[]=[]
    payment:string =""
    total:number =0
}

