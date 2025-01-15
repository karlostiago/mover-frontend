import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogAddressComponent} from "../../app/pages/client/dialog-address/dialog-address.component";
import {DialogModule} from "primeng/dialog";
import {TableModule} from "primeng/table";
import {GlobalDialogComponent} from "./global-dialog.component";
import {DialogFipeComponent} from "../../app/pages/vehicle/dialog-fipe/dialog-fipe.component";
import {SharedModule} from "../SharedModule";
import {DialogContactComponent} from "../../app/pages/client/dialog-contact/dialog-contact.component";
import {InputTextModule} from "primeng/inputtext";
import {ButtonDirective} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {PaginatorModule} from "primeng/paginator";
import {
    DialogTerminateContractComponent
} from "../../app/pages/contract/dialog-terminate-contract/dialog-terminate-contract.component";
import {InputTextareaModule} from "primeng/inputtextarea";
import {InputSwitchModule} from "primeng/inputswitch";
import {DialogSubcategoryComponent} from "../../app/pages/category/dialog-subcategory/dialog-subcategory.component";
import {
    DialogConfirmationPaymentComponent
} from "../../app/pages/transaction/dialog-confirmation-payment/dialog-confirmation-payment.component";
import {
    DialogDeleteTransactionComponent
} from "../../app/pages/transaction/dialog-delete-transaction/dialog-delete-transaction.component";
import {CalendarModule} from "primeng/calendar";
import {
    DialogUpdateFixedTransactionComponent
} from "../../app/pages/transaction/dialog-update-transaction/dialog-update-fixed-transaction.component";

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
        DialogUpdateFixedTransactionComponent
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
