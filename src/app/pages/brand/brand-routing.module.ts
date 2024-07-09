import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SearchBrandComponent} from "./search-brand/search-brand.component";
import {RegisterBrandComponent} from "./register-brand/register-brand.component";

const rotas: Routes = [
    {
        path: 'search/brands',
        component: SearchBrandComponent
    },
    {
        path: 'register/brands/new',
        component: RegisterBrandComponent
    },
    {
        path: 'update/brands/:id',
        component: RegisterBrandComponent
    },
]

@NgModule({
    imports: [
        RouterModule.forChild(rotas),
    ],
    exports: [
        RouterModule
    ]
})
export class BrandRoutingModule {

    constructor() { }
}
