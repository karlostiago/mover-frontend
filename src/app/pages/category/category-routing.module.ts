import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SearchCategoryComponent} from "./search-category/search-category.component";
import {RegisterCategoryComponent} from "./register-category/register-category.component";

const rotas: Routes = [
    {
        path: 'search/categories',
        component: SearchCategoryComponent
    },
    {
        path: 'register/categories/new',
        component: RegisterCategoryComponent
    },
    {
        path: 'update/categories/:id',
        component: RegisterCategoryComponent
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
export class CategoryRoutingModule {

    constructor() { }
}
