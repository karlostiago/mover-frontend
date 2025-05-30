import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SearchInvoiceComponent} from "./search-invoce/search-invoice.component";

const routes: Routes = [
    { path: ':id/credit-card/:cardId', component: SearchInvoiceComponent },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ]
})
export class InvoiceRoutingModule {

    constructor() { }
}
