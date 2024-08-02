import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SearchModelComponent} from "./search-model/search-model.component";
import {RegisterModelComponent} from "./register-model/register-model.component";

const rotas: Routes = [
    {
        path: 'search/models',
        component: SearchModelComponent
    },
    {
        path: 'register/models/new',
        component: RegisterModelComponent
    },
    {
        path: 'update/models/:id',
        component: RegisterModelComponent
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
export class ModelRoutingModule {

    constructor() { }
}
