import { ActionSheetOptions } from "@ionic/angular"
import { Product } from "../models/Product"


function MenuItenProduct(product:Product): ActionSheetOptions {
    return {
        header: product.description,
        cssClass: 'action-sheets-product',
        buttons: [
            {
                text: 'Visualizar Produto',
                icon: 'eye-outline',
                cssClass: 'btn-view',
                data: 'view',
            },
            {
                text: 'Editar Produto',
                icon: 'create-outline',
                cssClass: 'btn-edit',
                data: 'edit',
            },
            {
                text: 'Remover Produto',
                icon: 'trash-bin-outline',
                cssClass: 'btn-remove',
                data: 'remove'
            }
        ]
    }
}


const MenuOptions: ActionSheetOptions = {
    header: 'Opções',
    cssClass: 'action-sheets-product',
    buttons: [
        {
            text: 'Novo Produto',
            icon: 'add-circle-outline',
            cssClass: 'btn-new',
            data: 'new',
        },
        {
            text: 'Filtrar por estoque Baixo',
            icon: 'alert-circle-outline',
            cssClass: 'btn-filter',
            data: 'lowstock'
        },
        {
            text: 'Filtrar estoque em risco',
            icon: 'warning-outline',
            cssClass: 'btn-filter',
            data: 'badstock'
        },
        {
            text: 'Remover filtros',
            icon: 'remove-circle-outline',
            cssClass: 'btn-filter',
            data: 'removefilter'
        }
    ]
}


export { MenuItenProduct, MenuOptions } 