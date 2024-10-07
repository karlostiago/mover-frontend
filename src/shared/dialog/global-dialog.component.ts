import {Component, OnInit, ViewChild} from '@angular/core';
import {DialogAddressComponent} from "../../app/pages/client/dialog-address/dialog-address.component";
import {DialogFipeComponent} from "../../app/pages/vehicle/dialog-fipe/dialog-fipe.component";
import {TypeDialog} from "../service/GlobalDialogService";
import {DialogContactComponent} from "../../app/pages/client/dialog-contact/dialog-contact.component";

@Component({
  selector: 'app-global-dialog',
  templateUrl: './global-dialog.component.html',
  styleUrls: ['./global-dialog.component.css']
})
export class GlobalDialogComponent implements OnInit {

    @ViewChild(DialogAddressComponent) dialogAddress: DialogAddressComponent;

    @ViewChild(DialogFipeComponent) dialogFipe: DialogFipeComponent;

    @ViewChild(DialogContactComponent) dialogContact: DialogContactComponent;

    ngOnInit() { }

    open(typeDialog: TypeDialog, source?: any, target?: any) {
        if (typeDialog === TypeDialog.ADDRESS) {
            this.dialogAddress.showDialog(source);
        }
        else if (typeDialog === TypeDialog.FIPE) {
            this.dialogFipe.showDialog(source);
        }
        else if (typeDialog === TypeDialog.CONTACT) {
            this.dialogContact.showDialog(source, target);
        }
    }
}