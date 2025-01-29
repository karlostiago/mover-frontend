import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SearchContractComponent} from "./search-contract/search-contract.component";

const rotas: Routes = [
    {
        path: '',
        component: SearchContractComponent
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
export class ContractRoutingModule {

    constructor() { }
}
