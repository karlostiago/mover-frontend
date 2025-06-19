import {Injectable} from "@angular/core";
import {GlobalDialogComponent} from "../dialog/global-dialog.component";
import {Subject} from "rxjs";

export enum TypeDialog {
    ADDRESS,
    FIPE,
    CONTACT,
    TERMINATE_CONTRACT,
    SUBCATEGORY,
    DELETE_TRANSACTION,
    CONFIRMATION_PAYMENT_TRANSACTION,
    BATCH_UPDATE_TRANSACTION,
    SELECT_BANK_ICON,
    SELECT_BRAND_ICON,
    CONFIRMATION_INVOICE_PAYMENT
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
    openDialog<T = any>(typeDialog: TypeDialog, source?: any, target?: any): Subject<T> | null {
        if (this.globalDialog) {
            const result$ = new Subject<T>();
            this.globalDialog.open(typeDialog, source, target, result$);
            return result$;
        }
        return null;
    }
}
