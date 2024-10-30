import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SearchMaintenanceComponent} from "./search-maintenance/search-maintenance.component";
import {RegisterMaintenanceComponent} from "./register-maintenance/register-maintenance.component";

const rotas: Routes = [
    {
        path: 'search/maintenance',
        component: SearchMaintenanceComponent
    },
    {
        path: 'register/maintenance/new',
        component: RegisterMaintenanceComponent
    },
    {
        path: 'update/maintenance/:id',
        component: RegisterMaintenanceComponent
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
export class MaintenanceRoutingModule {

    constructor() { }
}
