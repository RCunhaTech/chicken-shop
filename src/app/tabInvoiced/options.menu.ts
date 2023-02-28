import { ActionSheetOptions } from "@ionic/angular";

export const optionsMenu:ActionSheetOptions = {
    header:'Opções',
    buttons:[
      {
        text:'Cancelar item e atualizar o total',
        data:{
            action:'cancel-order'
        }
      },
      {
        text:'Sair',
        data:{
          action:'exit'
        }
      }
    ]
}