import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SearchFineComponent} from "./search-fine/search-fine.component";
import {CanActivate} from "../../../core/login/AuthGuard";
import {RegisterFineComponent} from "./register-fine/register-fine.component";

const routes: Routes = [
    { path: '', component: SearchFineComponent, canActivate: [CanActivate] },
    { path: 'new', component: RegisterFineComponent, canActivate: [CanActivate] },
    { path: ':id', component: RegisterFineComponent, canActivate: [CanActivate] },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ]
})
export class FineRoutingModule {

    constructor() { }
}
