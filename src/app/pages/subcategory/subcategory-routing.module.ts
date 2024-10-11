import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SearchSubcategoryComponent} from "./search-subcategory/search-subcategory.component";
import {RegisterSubcategoryComponent} from "./register-subcategory/register-subcategory.component";

const rotas: Routes = [
    {
        path: 'search/subcategories',
        component: SearchSubcategoryComponent
    },
    {
        path: 'register/subcategories/new',
        component: RegisterSubcategoryComponent
    },
    {
        path: 'update/subcategories/:id',
        component: RegisterSubcategoryComponent
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
export class SubcategoryRoutingModule {

    constructor() { }
}
