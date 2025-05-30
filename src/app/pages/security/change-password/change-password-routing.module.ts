import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SearchChangePasswordComponent} from "./search-change-password/search-change-password.component";
import {CanActivate} from "../../../core/login/AuthGuard";
import {RegisterChangePasswordComponent} from "./register-change-password/register-change-password.component";

const routes: Routes = [
    { path: '', component: SearchChangePasswordComponent, canActivate: [CanActivate] },
    { path: ':id', component: RegisterChangePasswordComponent, canActivate: [CanActivate] },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ]
})
export class ChangePasswordRoutingModule {

    constructor() { }
}
