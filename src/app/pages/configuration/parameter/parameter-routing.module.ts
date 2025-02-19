import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SearchParameterComponent} from "./search-parameter/search-parameter.component";

const rotas: Routes = [
    {
        path: '',
        component: SearchParameterComponent
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
export class ParameterRoutingModule {

    constructor() { }
}
