import {Component, OnInit, ViewChild} from '@angular/core';
import {DialogAddressComponent} from "../../app/pages/client/dialog-address/dialog-address.component";
import {DialogFipeComponent} from "../../app/pages/vehicle/dialog-fipe/dialog-fipe.component";
import {TypeDialog} from "../service/GlobalDialogService";
import {DialogContactComponent} from "../../app/pages/client/dialog-contact/dialog-contact.component";
import {
    DialogTerminateContractComponent
} from "../../app/pages/contract/dialog-terminate-contract/dialog-terminate-contract.component";
import {DialogSubcategoryComponent} from "../../app/pages/category/dialog-subcategory/dialog-subcategory.component";

@Component({
  selector: 'app-global-dialog',
  templateUrl: './global-dialog.component.html',
  styleUrls: ['./global-dialog.component.css']
})
export class GlobalDialogComponent implements OnInit {

    @ViewChild(DialogAddressComponent) dialogAddress: DialogAddressComponent;

    @ViewChild(DialogFipeComponent) dialogFipe: DialogFipeComponent;

    @ViewChild(DialogContactComponent) dialogContact: DialogContactComponent;

    @ViewChild(DialogTerminateContractComponent) dialogTerminateContract: DialogTerminateContractComponent;

    @ViewChild(DialogSubcategoryComponent) dialogSubcategoryComponent: DialogSubcategoryComponent;

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
        else if (typeDialog === TypeDialog.TERMINATE_CONTRACT) {
            this.dialogTerminateContract.showDialog(source);
        }
        else if (typeDialog === TypeDialog.SUB_CATEGORY) {
            this.dialogSubcategoryComponent.showDialog(source, target);
        }
    }
}
