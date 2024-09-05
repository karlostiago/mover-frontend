import {Injectable} from "@angular/core";
import {DialogFipeComponent} from "../../app/pages/vehicle/dialog-fipe/dialog-fipe.component";

@Injectable({
    providedIn: 'root'
})
export class DialogService {

    private dialogFipe: DialogFipeComponent;

    registerDialogFipe(dialog: DialogFipeComponent) {
        this.dialogFipe = dialog;
    }

    openDialogFipe(data?: any) {
        this.dialogFipe.showDialog(data);
    }
}
