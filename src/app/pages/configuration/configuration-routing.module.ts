import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SearchConfigurationComponent} from "./search-configuration/search-configuration.component";
import {RegisterConfigurationComponent} from "./register-configuration/register-configuration.component";

const rotas: Routes = [
    {
        path: 'search/configurations',
        component: SearchConfigurationComponent
    },
    {
        path: 'register/configurations/new',
        component: RegisterConfigurationComponent
    },
    {
        path: 'update/configurations/:id',
        component: RegisterConfigurationComponent
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
export class ConfigurationRoutingModule {

    constructor() { }
}
