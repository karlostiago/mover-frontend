import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SearchProfileComponent} from "./search-profile/search-profile.component";
import {CanActivate} from "../../../core/login/AuthGuard";
import {RegisterProfileComponent} from "./register-profile/register-profile.component";

const routes: Routes = [
    { path: '', component: SearchProfileComponent, canActivate: [CanActivate] },
    { path: 'new', component: RegisterProfileComponent, canActivate: [CanActivate] },
    { path: ':id', component: RegisterProfileComponent, canActivate: [CanActivate] },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ]
})
export class ProfileRoutingModule {

    constructor() { }
}
