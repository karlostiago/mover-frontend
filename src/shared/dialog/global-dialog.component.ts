import {Component, OnInit, ViewChild} from '@angular/core';
import {DialogAddressComponent} from "../../app/pages/clients/client/dialog-address/dialog-address.component";
import {DialogFipeComponent} from "../../app/pages/fleets/vehicle/dialog-fipe/dialog-fipe.component";
import {TypeDialog} from "../service/GlobalDialogService";
import {DialogContactComponent} from "../../app/pages/clients/client/dialog-contact/dialog-contact.component";
import {
    DialogTerminateContractComponent
} from "../../app/pages/clients/contract/dialog-terminate-contract/dialog-terminate-contract.component";
import {
    DialogSubcategoryComponent
} from "../../app/pages/configuration/category/dialog-subcategory/dialog-subcategory.component";
import {
    DialogBankIconComponent
} from "../../app/core/components/select-bank-icon/dialog-bank-icon/dialog-bank-icon.component";
import {
    DialogBrandIconComponent
} from "../../app/core/components/select-brand-icon/dialog-brand-icon/dialog-brand-icon.component";
import {
    DialogDeleteTransactionComponent
} from "../../app/pages/money/transaction/dialog-delete-transaction/dialog-delete-transaction.component";
import {
    DialogConfirmationPaymentComponent
} from "../../app/pages/money/transaction/dialog-confirmation-payment/dialog-confirmation-payment.component";
import {
    DialogBatchUpdateTransactionComponent
} from "../../app/pages/money/transaction/dialog-batch-update-transaction/dialog-batch-update-transaction.component";
import {
    DialogInvoicePaymentComponent
} from "../../app/pages/money/invoice/dialog-invoice-payment/dialog-invoice-payment.component";
import {Subject} from "rxjs";

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

    @ViewChild(DialogBatchUpdateTransactionComponent) dialogUpdateFixedTransactionComponent: DialogBatchUpdateTransactionComponent;

    @ViewChild(DialogBankIconComponent) dialogBankIconComponent: DialogBankIconComponent;

    @ViewChild(DialogBrandIconComponent) dialogBrandIconComponent: DialogBrandIconComponent;

    @ViewChild(DialogInvoicePaymentComponent) dialogInvoicePaymentComponent: DialogInvoicePaymentComponent;

    ngOnInit() { }

    open(typeDialog: TypeDialog, source?: any, target?: any, result$?: Subject<any>) {
        const dialogMap: Record<TypeDialog, (source?: any, target?: any, result$?: Subject<any>) => void> = {
            [TypeDialog.ADDRESS]: this.dialogAddress.showDialog.bind(this.dialogAddress),
            [TypeDialog.FIPE]: this.dialogFipe.showDialog.bind(this.dialogFipe),
            [TypeDialog.CONTACT]: this.dialogContact.showDialog.bind(this.dialogContact),
            [TypeDialog.TERMINATE_CONTRACT]: this.dialogTerminateContract.showDialog.bind(this.dialogTerminateContract),
            [TypeDialog.SUBCATEGORY]: this.dialogSubcategoryComponent.showDialog.bind(this.dialogSubcategoryComponent),
            [TypeDialog.DELETE_TRANSACTION]: this.dialogDeleteTransactionComponent.showDialog.bind(this.dialogDeleteTransactionComponent),
            [TypeDialog.CONFIRMATION_PAYMENT_TRANSACTION]: this.dialogConfirmationPaymentComponent.showDialog.bind(this.dialogConfirmationPaymentComponent),
            [TypeDialog.BATCH_UPDATE_TRANSACTION]: this.dialogUpdateFixedTransactionComponent.showDialog.bind(this.dialogUpdateFixedTransactionComponent),
            [TypeDialog.SELECT_BANK_ICON]: this.dialogBankIconComponent.showDialog.bind(this.dialogBankIconComponent),
            [TypeDialog.SELECT_BRAND_ICON]: this.dialogBrandIconComponent.showDialog.bind(this.dialogBrandIconComponent),
            [TypeDialog.CONFIRMATION_INVOICE_PAYMENT]: this.dialogInvoicePaymentComponent.showDialog.bind(this.dialogInvoicePaymentComponent),
        };

        const dialogFunction = dialogMap[typeDialog];

        if (dialogFunction) {
            dialogFunction(source, target, result$);
        } else {
            console.warn(`Dialog type ${typeDialog} is not handled.`);
        }
    }
}
