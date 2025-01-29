import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SearchCategoryComponent} from "./search-category/search-category.component";

const rotas: Routes = [
    {
        path: '',
        component: SearchCategoryComponent
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
