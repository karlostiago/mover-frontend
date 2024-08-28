import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {RegisterAccountComponent} from "./register-account/register-account.component";
import {SearchAccountComponent} from "./search-account/search-account.component";

const rotas: Routes = [
    {
        path: 'search/accounts',
        component: SearchAccountComponent
    },
    {
        path: 'register/accounts/new',
        component: RegisterAccountComponent
    },
    {
        path: 'update/accounts/:id',
        component: RegisterAccountComponent
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
export class AccountRoutingModule {

    constructor() { }
}
