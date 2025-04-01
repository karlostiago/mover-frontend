import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SearchInvoiceComponent} from "./search-invoce/search-invoice.component";

const rotas: Routes = [
    {
        path: '',
        component: SearchInvoiceComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(rotas),
    ],
    exports: [
        RouterModule
    ]
})
export class InvoiceRoutingModule {

    constructor() { }
}
