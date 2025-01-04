import {Component, OnInit, ViewChild} from '@angular/core';
import {DialogAddressComponent} from "../../app/pages/client/dialog-address/dialog-address.component";
import {DialogFipeComponent} from "../../app/pages/vehicle/dialog-fipe/dialog-fipe.component";
import {TypeDialog} from "../service/GlobalDialogService";
import {DialogContactComponent} from "../../app/pages/client/dialog-contact/dialog-contact.component";
import {
    DialogTerminateContractComponent
} from "../../app/pages/contract/dialog-terminate-contract/dialog-terminate-contract.component";
import {DialogSubcategoryComponent} from "../../app/pages/category/dialog-subcategory/dialog-subcategory.component";
import {
    DialogDeleteTransactionComponent
} from "../../app/pages/transaction/dialog-delete-transaction/dialog-delete-transaction.component";
import {
    DialogConfirmationPaymentComponent
} from "../../app/pages/transaction/dialog-confirmation-payment/dialog-confirmation-payment.component";

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

    @ViewChild(DialogDeleteTransactionComponent) dialogDeleteTransactionComponent: DialogDeleteTransactionComponent;

    @ViewChild(DialogConfirmationPaymentComponent) dialogConfirmationPaymentComponent: DialogConfirmationPaymentComponent;

    ngOnInit() { }

    open(typeDialog: TypeDialog, source?: any, target?: any) {
        const dialogMap: Record<TypeDialog, (source?: any, target?: any) => void> = {
            [TypeDialog.ADDRESS]: this.dialogAddress.showDialog.bind(this.dialogAddress),
            [TypeDialog.FIPE]: this.dialogFipe.showDialog.bind(this.dialogFipe),
            [TypeDialog.CONTACT]: this.dialogContact.showDialog.bind(this.dialogContact),
            [TypeDialog.TERMINATE_CONTRACT]: this.dialogTerminateContract.showDialog.bind(this.dialogTerminateContract),
            [TypeDialog.SUBCATEGORY]: this.dialogSubcategoryComponent.showDialog.bind(this.dialogSubcategoryComponent),
            [TypeDialog.DELETE_TRANSACTION]: this.dialogDeleteTransactionComponent.showDialog.bind(this.dialogDeleteTransactionComponent),
            [TypeDialog.CONFIRMATION_PAYMENT_TRANSATION]: this.dialogConfirmationPaymentComponent.showDialog.bind(this.dialogConfirmationPaymentComponent),
        };

        const dialogFunction = dialogMap[typeDialog];

        if (dialogFunction) {
            dialogFunction(source, target);
        } else {
            console.warn(`Dialog type ${typeDialog} is not handled.`);
        }
    }
}
