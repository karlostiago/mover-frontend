import {Component, OnInit, ViewChild} from '@angular/core';
import {DialogAddressComponent} from "../../app/pages/client/dialog-address/dialog-address.component";
import {DialogFipeComponent} from "../../app/pages/vehicle/dialog-fipe/dialog-fipe.component";
import {TypeDialog} from "../service/GlobalDialogService";

@Component({
  selector: 'app-global-dialog',
  templateUrl: './global-dialog.component.html',
  styleUrls: ['./global-dialog.component.css']
})
export class GlobalDialogComponent implements OnInit {

    @ViewChild(DialogAddressComponent) dialogAddress: DialogAddressComponent;

    @ViewChild(DialogFipeComponent) dialogFipe: DialogFipeComponent;

    ngOnInit() { }

    open(typeDialog: TypeDialog, data?: any) {
        if (typeDialog === TypeDialog.ADDRESS) {
            this.dialogAddress.showDialog(data);
        }
        else if (typeDialog === TypeDialog.FIPE) {
            this.dialogFipe.showDialog(data);
        }
    }
}
