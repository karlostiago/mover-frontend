import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SearchMaintenanceComponent} from "./search-maintenance/search-maintenance.component";

const rotas: Routes = [
    {
        path: '',
        component: SearchMaintenanceComponent
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
export class MaintenanceRoutingModule {

    constructor() { }
}
