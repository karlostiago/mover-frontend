import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SearchModelComponent} from "./search-model/search-model.component";

const rotas: Routes = [
    {
        path: '',
        component: SearchModelComponent
    }
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
