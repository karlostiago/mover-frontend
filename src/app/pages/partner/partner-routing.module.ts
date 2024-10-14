import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SearchPartnerComponent} from "./search-partner/search-partner.component";
import {RegisterPartnerComponent} from "./register-partner/register-partner.component";

const rotas: Routes = [
    {
        path: 'search/partners',
        component: SearchPartnerComponent
    },
    {
        path: 'register/partners/new',
        component: RegisterPartnerComponent
    },
    {
        path: 'update/partners/:id',
        component: RegisterPartnerComponent
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
export class PartnerRoutingModule {

    constructor() { }
}
