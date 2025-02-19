import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TransactionModule} from "./transaction/transaction.module";

@NgModule({
    declarations: [

    ],
    exports: [

    ],
    imports: [
        CommonModule,
        TransactionModule
    ]
})
export class MoneyModule { }
