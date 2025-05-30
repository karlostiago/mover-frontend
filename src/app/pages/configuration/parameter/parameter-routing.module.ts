import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SearchParameterComponent} from "./search-parameter/search-parameter.component";
import {CanActivate} from "../../../core/login/AuthGuard";
import {RegisterParameterComponent} from "./register-parameter/register-parameter.component";

const routes: Routes = [
    { path: '', component: SearchParameterComponent, canActivate: [CanActivate] },
    { path: 'new', component: RegisterParameterComponent, canActivate: [CanActivate] },
    { path: ':id', component: RegisterParameterComponent, canActivate: [CanActivate] },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ]
})
export class ParameterRoutingModule {

    constructor() { }
}
