import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SearchClientComponent} from "./search-client/search-client.component";
import {RegisterClientComponent} from "./register-client/register-client.component";

const rotas: Routes = [
    {
        path: 'clients',
        component: SearchClientComponent
    },
    {
        path: 'clients/new',
        component: RegisterClientComponent
    },
    {
        path: 'clients/:id',
        component: RegisterClientComponent
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
export class ClientRoutingModule {

    constructor() { }
}
