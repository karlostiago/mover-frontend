import {Injectable} from "@angular/core";
import {GlobalDialogComponent} from "../dialog/global-dialog.component";

export enum TypeDialog {
    ADDRESS,
    FIPE,
    CONTACT,
    TERMINATE_CONTRACT,
    SUBCATEGORY,
    LIST_SUBCATEGORY
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
