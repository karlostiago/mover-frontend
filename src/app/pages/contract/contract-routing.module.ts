import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SearchContractComponent} from "./search-contract/search-contract.component";
import {RegisterContractComponent} from "./register-contract/register-contract.component";

const rotas: Routes = [
    {
        path: 'search/contracts',
        component: SearchContractComponent
    },
    {
        path: 'register/contracts/new',
        component: RegisterContractComponent
    },
    {
        path: 'update/contracts/:id',
        component: RegisterContractComponent
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
export class ContractRoutingModule {

    constructor() { }
}
