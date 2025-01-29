import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SearchConfigurationComponent} from "./search-configuration/search-configuration.component";

const rotas: Routes = [
    {
        path: '',
        component: SearchConfigurationComponent
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
export class ConfigurationRoutingModule {

    constructor() { }
}
