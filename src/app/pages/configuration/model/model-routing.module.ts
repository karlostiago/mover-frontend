import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SearchModelComponent} from "./search-model/search-model.component";
import {CanActivate} from "../../../core/login/AuthGuard";
import {RegisterModelComponent} from "./register-model/register-model.component";

const routes: Routes = [
    { path: '', component: SearchModelComponent, canActivate: [CanActivate] },
    { path: 'new', component: RegisterModelComponent, canActivate: [CanActivate] },
    { path: ':id', component: RegisterModelComponent, canActivate: [CanActivate] },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ]
})
export class ModelRoutingModule {

    constructor() { }
}
