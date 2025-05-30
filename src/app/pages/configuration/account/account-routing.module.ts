import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SearchAccountComponent} from "./search-account/search-account.component";
import {CanActivate} from "../../../core/login/AuthGuard";
import {RegisterAccountComponent} from "./register-account/register-account.component";

const routes: Routes = [
    { path: '', component: SearchAccountComponent, canActivate: [CanActivate] },
    { path: 'new', component: RegisterAccountComponent, canActivate: [CanActivate] },
    { path: ':id', component: RegisterAccountComponent, canActivate: [CanActivate] },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ]
})
export class AccountRoutingModule {

    constructor() { }
}
