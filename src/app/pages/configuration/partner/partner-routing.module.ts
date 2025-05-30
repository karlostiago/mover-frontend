import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SearchPartnerComponent} from "./search-partner/search-partner.component";
import {CanActivate} from "../../../core/login/AuthGuard";
import {RegisterPartnerComponent} from "./register-partner/register-partner.component";

const routes: Routes = [
    { path: '', component: SearchPartnerComponent, canActivate: [CanActivate] },
    { path: 'new', component: RegisterPartnerComponent, canActivate: [CanActivate] },
    { path: ':id', component: RegisterPartnerComponent, canActivate: [CanActivate] },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ]
})
export class PartnerRoutingModule {

    constructor() { }
}
