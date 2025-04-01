import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TransactionModule} from "./transaction/transaction.module";
import {InvoiceModule} from "./invoice/invoice.module";

@NgModule({
    declarations: [

    ],
    exports: [

    ],
    imports: [
        CommonModule,
        TransactionModule,
        InvoiceModule
    ]
})
export class MoneyModule { }
