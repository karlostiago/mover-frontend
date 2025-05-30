import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SearchClientComponent} from "./search-client/search-client.component";
import {CanActivate} from "../../../core/login/AuthGuard";
import {RegisterClientComponent} from "./register-client/register-client.component";

const routes: Routes = [
    { path: '', component: SearchClientComponent, canActivate: [CanActivate] },
    { path: 'new', component: RegisterClientComponent, canActivate: [CanActivate] },
    { path: ':id', component: RegisterClientComponent, canActivate: [CanActivate] },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ]
})
export class ClientRoutingModule {

    constructor() { }
}
