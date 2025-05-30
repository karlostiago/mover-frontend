import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SearchCardComponent} from "./search-card/search-card.component";
import {CanActivate} from "../../../core/login/AuthGuard";
import {RegisterCardComponent} from "./register-card/register-card.component";

const routes: Routes = [
    { path: '', component: SearchCardComponent, canActivate: [CanActivate] },
    { path: 'new', component: RegisterCardComponent, canActivate: [CanActivate] },
    { path: ':id', component: RegisterCardComponent, canActivate: [CanActivate] },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ]
})
export class CardRoutingModule {

    constructor() { }
}
