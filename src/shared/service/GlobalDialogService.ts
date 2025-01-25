import {Injectable} from "@angular/core";
import {GlobalDialogComponent} from "../dialog/global-dialog.component";

export enum TypeDialog {
    ADDRESS,
    FIPE,
    CONTACT,
    TERMINATE_CONTRACT,
    SUBCATEGORY,
    DELETE_TRANSACTION,
    CONFIRMATION_PAYMENT_TRANSATION,
    BATCH_UPDATE_TRANSACTION,
    SELECT_BANK_ICON,
    SELECT_BRAND_ICON
}

@Injectable({
    providedIn: 'root'
})
export class GlobalDialogService {

    private globalDialog: GlobalDialogComponent;

    register(globalDialog: GlobalDialogComponent) {
        this.globalDialog = globalDialog;
    }

    /**
     * @param typeDialog
     * @param source
     * @param target usado para atualizar registro
     */
    openDialog(typeDialog: TypeDialog, source?: any, target?: any) {
        if (this.globalDialog) {
            this.globalDialog.open(typeDialog, source, target);
        }
    }
}
