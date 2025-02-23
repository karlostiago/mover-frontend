import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogAddressComponent} from "../../app/pages/clients/client/dialog-address/dialog-address.component";
import {DialogModule} from "primeng/dialog";
import {TableModule} from "primeng/table";
import {GlobalDialogComponent} from "./global-dialog.component";
import {DialogFipeComponent} from "../../app/pages/fleets/vehicle/dialog-fipe/dialog-fipe.component";
import {SharedModule} from "../SharedModule";
import {DialogContactComponent} from "../../app/pages/clients/client/dialog-contact/dialog-contact.component";
import {InputTextModule} from "primeng/inputtext";
import {ButtonDirective} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {PaginatorModule} from "primeng/paginator";
import {
    DialogTerminateContractComponent
} from "../../app/pages/clients/contract/dialog-terminate-contract/dialog-terminate-contract.component";
import {InputTextareaModule} from "primeng/inputtextarea";
import {InputSwitchModule} from "primeng/inputswitch";
import {
    DialogSubcategoryComponent
} from "../../app/pages/configuration/category/dialog-subcategory/dialog-subcategory.component";
import {CalendarModule} from "primeng/calendar";
import {
    DialogBankIconComponent
} from "../../app/core/components/select-bank-icon/dialog-bank-icon/dialog-bank-icon.component";
import {
    DialogBrandIconComponent
} from "../../app/core/components/select-brand-icon/dialog-brand-icon/dialog-brand-icon.component";
import {
    DialogConfirmationPaymentComponent
} from "../../app/pages/money/transaction/dialog-confirmation-payment/dialog-confirmation-payment.component";
import {
    DialogDeleteTransactionComponent
} from "../../app/pages/money/transaction/dialog-delete-transaction/dialog-delete-transaction.component";
import {
    DialogBatchUpdateTransactionComponent
} from "../../app/pages/money/transaction/dialog-batch-update-transaction/dialog-batch-update-transaction.component";

@NgModule({
    declarations: [
        GlobalDialogComponent,
        DialogAddressComponent,
        DialogFipeComponent,
        DialogContactComponent,
        DialogTerminateContractComponent,
        DialogSubcategoryComponent,
        DialogConfirmationPaymentComponent,
        DialogDeleteTransactionComponent,
        DialogBatchUpdateTransactionComponent,
        DialogBankIconComponent,
        DialogBrandIconComponent
    ],
    exports: [
        DialogAddressComponent,
        GlobalDialogComponent,
        DialogFipeComponent,
        DialogContactComponent,
        DialogSubcategoryComponent,
        DialogDeleteTransactionComponent,
        DialogConfirmationPaymentComponent
    ],
    imports: [
        CommonModule,
        DialogModule,
        TableModule,
        SharedModule,
        InputTextModule,
        ButtonDirective,
        FormsModule,
        PaginatorModule,
        InputTextareaModule,
        InputSwitchModule,
        CalendarModule
    ]
})
export class GlobalDialogModule { }
