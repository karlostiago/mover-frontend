import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SearchClientComponent} from "./search-client/search-client.component";

const rotas: Routes = [
    {
        path: '',
        component: SearchClientComponent
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
export class ClientRoutingModule {

    constructor() { }
}
