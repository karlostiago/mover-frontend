import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SearchCategoryComponent} from "./search-category/search-category.component";
import {CanActivate} from "../../../core/login/AuthGuard";
import {RegisterCategoryComponent} from "./register-category/register-category.component";

const routes: Routes = [
    { path: '', component: SearchCategoryComponent, canActivate: [CanActivate] },
    { path: 'new', component: RegisterCategoryComponent, canActivate: [CanActivate] },
    { path: ':id', component: RegisterCategoryComponent, canActivate: [CanActivate] },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ]
})
export class CategoryRoutingModule {

    constructor() { }
}
