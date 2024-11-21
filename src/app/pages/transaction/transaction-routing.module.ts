import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SearchTransactionComponent} from "./search-transaction/search-transaction.component";
import {RegisterTransactionComponent} from "./register-transaction/register-transaction.component";

const rotas: Routes = [
    {
        path: 'search/transactions',
        component: SearchTransactionComponent
    },
    {
        path: 'register/transactions/new',
        component: RegisterTransactionComponent
    },
    {
        path: 'update/transactions/:id',
        component: RegisterTransactionComponent
    },
]

@NgModule({
    imports: [
        RouterModule.forChild(rotas),
    ],
    exports: [
        RouterModule
    ]
})
export class TransactionRoutingModule {

    constructor() { }
}
