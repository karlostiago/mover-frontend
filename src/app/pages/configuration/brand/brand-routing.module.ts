import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SearchBrandComponent} from "./search-brand/search-brand.component";
import {CanActivate} from "../../../core/login/AuthGuard";
import {RegisterBrandComponent} from "./register-brand/register-brand.component";

const routes: Routes = [
    { path: '', component: SearchBrandComponent, canActivate: [CanActivate] },
    { path: 'new', component: RegisterBrandComponent, canActivate: [CanActivate] },
    { path: ':id', component: RegisterBrandComponent, canActivate: [CanActivate] },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ]
})
export class BrandRoutingModule {

    constructor() { }
}
