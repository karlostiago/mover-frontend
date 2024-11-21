import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TransactionRoutingModule} from "./transaction-routing.module";
import {RegisterTransactionComponent} from "./register-transaction/register-transaction.component";
import {SearchTransactionComponent} from "./search-transaction/search-transaction.component";
import {FormsModule} from "@angular/forms";
import {Button, ButtonDirective} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {TableModule} from "primeng/table";
import {InputSwitchModule} from "primeng/inputswitch";
import {DropdownModule} from "primeng/dropdown";
import {DialogModule} from "primeng/dialog";
import {SharedModule} from "../../../shared/SharedModule";
import {InputTextareaModule} from "primeng/inputtextarea";

@NgModule({
    declarations: [
        RegisterTransactionComponent,
        SearchTransactionComponent
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
        InputTextareaModule
    ]
})
export class TransactionModule { }
