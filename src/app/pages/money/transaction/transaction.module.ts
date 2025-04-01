import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TransactionRoutingModule} from "./transaction-routing.module";
import {FormsModule} from "@angular/forms";
import {Button, ButtonDirective} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {TableModule} from "primeng/table";
import {InputSwitchModule} from "primeng/inputswitch";
import {DropdownModule} from "primeng/dropdown";
import {DialogModule} from "primeng/dialog";
import {SharedModule} from "../../../../shared/SharedModule";
import {InputTextareaModule} from "primeng/inputtextarea";
import {CalendarModule} from "primeng/calendar";
import {MultiSelectModule} from "primeng/multiselect";
import {GlobalDialogModule} from "../../../../shared/dialog/global-dialog.module";
import {RegisterTransactionComponent} from "./register-transaction/register-transaction.component";
import {SearchTransactionComponent} from "./search-transaction/search-transaction.component";
import {TransferTransactionComponent} from "./transfer-transaction/transfer-transaction.component";
import {
    CorporateCapitalTransactionComponent
} from "./corporate-capital-transaction/corporate-capital-transaction.component";
import {CommonTransactionComponent} from "./common-transaction/common-transaction.component";
import {ScrollUpModule} from "../../../core/components/scroll-up/scroll-up.module";
import {SidebarDetailsModule} from "../../../core/components/sidebar-details/sidebar-details.module";

@NgModule({
    declarations: [
        RegisterTransactionComponent,
        SearchTransactionComponent,
        TransferTransactionComponent,
        CorporateCapitalTransactionComponent,
        CommonTransactionComponent
    ],
    exports: [
        RegisterTransactionComponent,
        SearchTransactionComponent
    ],
    imports: [
        CommonModule,
        TransactionRoutingModule,
        FormsModule,
        ButtonDirective,
        InputTextModule,
        TableModule,
        Button,
        InputSwitchModule,
        DropdownModule,
        DialogModule,
        SharedModule,
        InputTextareaModule,
        CalendarModule,
        MultiSelectModule,
        GlobalDialogModule,
        ScrollUpModule,
        SidebarDetailsModule
    ]
})
export class TransactionModule { }
