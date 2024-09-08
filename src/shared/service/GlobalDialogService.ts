import {Injectable} from "@angular/core";
import {GlobalDialogComponent} from "../dialog/global-dialog.component";

export enum TypeDialog {
    ADDRESS,
    FIPE,
    CONTACT
}

@Injectable({
    providedIn: 'root'
})
export class GlobalDialogService {

    private globalDialog: GlobalDialogComponent;

    register(globalDialog: GlobalDialogComponent) {
        this.globalDialog = globalDialog;
    }

    openDialog(typeDialog: TypeDialog, data?: any) {
        if (this.globalDialog) {
            this.globalDialog.open(typeDialog, data);
        }
    }
}
