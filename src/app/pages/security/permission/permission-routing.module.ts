import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SearchPermissionComponent} from "./search-permission/search-permission.component";
import {CanActivate} from "../../../core/login/AuthGuard";
import {RegisterPermissionComponent} from "./register-permission/register-permission.component";

const routes: Routes = [
    { path: '', component: SearchPermissionComponent, canActivate: [CanActivate] },
    { path: 'new', component: RegisterPermissionComponent, canActivate: [CanActivate] },
    { path: ':id', component: RegisterPermissionComponent, canActivate: [CanActivate] },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ]
})
export class PermissionRoutingModule {

    constructor() { }
}
