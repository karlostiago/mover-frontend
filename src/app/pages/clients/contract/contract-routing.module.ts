import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SearchContractComponent} from "./search-contract/search-contract.component";
import {CanActivate} from "../../../core/login/AuthGuard";
import {RegisterContractComponent} from "./register-contract/register-contract.component";

const routes: Routes = [
    { path: '', component: SearchContractComponent, canActivate: [CanActivate] },
    { path: 'new', component: RegisterContractComponent, canActivate: [CanActivate] },
    { path: ':id', component: RegisterContractComponent, canActivate: [CanActivate] },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ]
})
export class ContractRoutingModule {

    constructor() { }
}
