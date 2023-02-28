import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { OrderService } from '../services/order.service';
import { StateService } from '../services/state.service';
import * as bcrypt from "bcryptjs";

@Component({
  selector: 'app-options',
  templateUrl: 'options.page.html',
  styleUrls: ['options.page.scss']
})
export class OptionsPage {

  key:string ='@chicken.theme'
  theme:any

  price =this.stateSevice.priceChicken.asObservable()
  total =this.stateSevice.quantityChicken.asObservable()
  header =this.stateSevice.headerReceipt.asObservable()
  footer =this.stateSevice.footerReceipt.asObservable()

  print =this.stateSevice.printIf.getValue()

  options:any[] =[
    { header:'Preço do Frango',type:'text',name:'@chicken.price',placeholder:'Preço de Venda do Frango',value:this.price },
    { header:'Quantidade de Frangos',type:'text',name:'@chicken.quantity.start',placeholder:'Quantidade de Frangos',value:this.total },
    { header:'Cabeçalho do Recibo',type:'text',name:'@chicken.receipt.header',placeholder:'Texto do Cabeçalho do Recibo',value:this.header },
    { header:'Rodapé do Recibo',type:'text',name:'@chicken.receipt.footer',placeholder:'Texto do Rodapé do Recibo',value:this.footer },
  ]
  
  pass:any ="123456"
  constructor(
    private alertCtrl: AlertController,
    public stateSevice:StateService,
    private orderService:OrderService
  ) { }

  ngOnInit(): void {
    this.generatePassword()
  }

  generatePassword() {
    const pass =localStorage.getItem('@chicken.password')
    if(pass) {
      return
    }
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync('123456',salt)
    this.save('@chicken.password',hash) 
  }

  async openModal(options:any) {
    const { header,type,name,placeholder } = options
    const alert = await this.alertCtrl.create({
      header,
      inputs:[{ type,placeholder,name, }],
      buttons: [
        {
          text:'Salvar',
          handler:data  => {
            const [key] = Object.keys(data)
            const [value] = Object.values(data)
            this.save(key,value)
          }
        },
      ]
    })
    await alert.present()
  }

  changeTheme(event:any) {
    const value = event.detail.value
    switch(value) {
      case 'Dark': {
        document.body.setAttribute('theme',value)
        this.save(this.key,value)
        break
      }
      case 'Cinza': {
        document.body.setAttribute('theme',value)
        this.save(this.key,value)
        break
      }
    }
  }

  confirmPrint(e:any) {
    this.stateSevice.printIf.next(!this.stateSevice.printIf.getValue())
    this.save('@chicken.confirm.print',this.stateSevice.printIf.getValue())
    this.print =this.stateSevice.printIf.getValue()
  }

  async reset() {
    const alert = await this.alertCtrl.create({
      header:'Deseja Remover os Faturamentos e o Total de Frangos?',
      buttons: [
        {
          text:'cancelar',
          handler:() => {}
        },
        {
          text:'Remover',
          handler:() => {
            this.orderService.clearOrders()
          }
        },
      ]
    })
    alert.present()
  }

  private save(key:string,value:any) {
    localStorage.setItem(key,value)
    switch(key) {
      case '@chicken.quantity.start': {
        this.stateSevice.creditValueChicken(Number(value))
        break
      }
      case '@chicken.price' : { 
        this.stateSevice.priceChicken.next(value) 
        break
      }
      case '@chicken.receipt.header': {
        this.stateSevice.headerReceipt.next(value)
        break
      }
      case '@chicken.receipt.footer': {
        this.stateSevice.footerReceipt.next(value)
        break
      }
      case this.key: {
        this.stateSevice.theme.next(value)
      }
    }
  }
}



