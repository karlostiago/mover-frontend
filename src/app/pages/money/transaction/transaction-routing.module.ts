import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SearchTransactionComponent} from "./search-transaction/search-transaction.component";
import {CanActivate} from "../../../core/login/AuthGuard";
import {RegisterTransactionComponent} from "./register-transaction/register-transaction.component";

const routes: Routes = [
    { path: '', component: SearchTransactionComponent, canActivate: [CanActivate] },
    { path: ':type/new', component: RegisterTransactionComponent, canActivate: [CanActivate] },
    { path: ':type/:id', component: RegisterTransactionComponent, canActivate: [CanActivate] },
    { path: ':type/:id/clone', component: RegisterTransactionComponent, canActivate: [CanActivate] }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ]
})
export class TransactionRoutingModule {

    constructor() { }
}
