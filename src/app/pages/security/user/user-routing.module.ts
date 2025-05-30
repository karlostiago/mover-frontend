import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SearchUserComponent} from "./search-user/search-user.component";
import {CanActivate} from "../../../core/login/AuthGuard";
import {RegisterUserComponent} from "./register-user/register-user.component";

const routes: Routes = [
    { path: '', component: SearchUserComponent, canActivate: [CanActivate] },
    { path: 'new', component: RegisterUserComponent, canActivate: [CanActivate] },
    { path: ':id', component: RegisterUserComponent, canActivate: [CanActivate] },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ]
})
export class UserRoutingModule {

    constructor() { }
}
