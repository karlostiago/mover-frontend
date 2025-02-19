import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {RegisterAccountComponent} from "./register-account/register-account.component";
import {SearchAccountComponent} from "./search-account/search-account.component";

const rotas: Routes = [
    {
        path: '', component: SearchAccountComponent
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
export class AccountRoutingModule {

    constructor() { }
}
