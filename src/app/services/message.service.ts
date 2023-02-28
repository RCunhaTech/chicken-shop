import { Injectable } from "@angular/core";
import { AlertController,ToastController } from "@ionic/angular";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class MessageService {

    message = new BehaviorSubject('')
    messageTimer = new BehaviorSubject(0)
    messageCss = new BehaviorSubject('')

    constructor(
        private toastCtrl: ToastController,
        private alertCtrl: AlertController
    ) { }

    sendMessage(message: string, duration: number, cssClass: string): void {
        this.message.next(message)
        this.messageCss.next(cssClass)
        this.messageTimer.next(duration)
        this.decrementTimer()
    }

    private decrementTimer(): void {
        setTimeout(() => {
            if (this.messageTimer.value === 0) {
                this.message.next('')
                this.messageCss.next('')
            } else {
                this.messageTimer.next(this.messageTimer.value - 1)
                this.decrementTimer()
            }
        }, 1000)
    }

    async success(header: string, color: string = 'success', duration: number = 3000, position: any = "top"): Promise<void> {
        const note = await this.toastCtrl.create({ header, duration, position, color })
        await note.present()
    }

    async danger(header: string, color: string = 'danger', duration: number = 3000, position: any = "top"): Promise<void> {
        const note = await this.toastCtrl.create({ header, duration, position, color })
        await note.present()
    }

    async secondary(header: string, color: string = 'secondary', duration: number = 3000, position: any = "top"): Promise<void> {
        const note = await this.toastCtrl.create({ header, duration, position, color })
        await note.present()
    }

    async warning(header: string, color: string = 'warning', duration: number = 3000, position: any = "top"): Promise<void> {
        const note = await this.toastCtrl.create({ header, duration, position, color })
        await note.present()
    }

    async ligth(header: string, color: string = 'ligth', duration: number = 3000, position: any = "top"): Promise<void> {
        const note = await this.toastCtrl.create({ header, duration, position, color })
        await note.present()
    }

    async remove(subHeader: string, header: string = 'Atenção!', btnCalcel: string = 'CANCELAR', btnConfirm: string = 'CONFIRMAR') {
        const alert = await this.alertCtrl.create({
            header, subHeader, animated: true,
            buttons: [
                {
                    text: btnCalcel,
                    handler: () => {
                        alert.dismiss(false)
                        return false
                    }
                },
                {
                    text: btnConfirm,
                    handler: () => {
                        alert.dismiss(true)
                        return false
                    }
                }
            ]
        })
        await alert.present()
        const { data } = await alert.onDidDismiss()
        return data
    }

    async confirm(subHeader: string, header: string = 'Atenção!', btnCalcel: string = 'CANCELAR', btnConfirm: string = 'CONFIRMAR') {
        const alert = await this.alertCtrl.create({
            header, subHeader, animated: true,//message:'É necessario a senha',
            inputs:[
                {
                    type:'password',name:'password',placeholder:'Senha de segurança'
                }
            ],
            buttons: [
                {
                    text: btnCalcel,
                    handler: () => {
                        alert.dismiss(true)
                        return false
                    }
                },
                {
                    text: btnConfirm,
                    handler: (value) => {
                        alert.dismiss(value)
                        return false
                    }
                }
            ]
        })
        await alert.present()
        const { data } = await alert.onDidDismiss()
        return data
    }
}

export class Message {
    status: boolean = true
    message?: string
    constructor(status: boolean, message: string) {
        this.status = status
        this.message = message
    }
}

