import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SearchMaintenanceComponent} from "./search-maintenance/search-maintenance.component";
import {CanActivate} from "../../../core/login/AuthGuard";
import {RegisterMaintenanceComponent} from "./register-maintenance/register-maintenance.component";

const routes: Routes = [
    { path: '', component: SearchMaintenanceComponent, canActivate: [CanActivate] },
    { path: 'new', component: RegisterMaintenanceComponent, canActivate: [CanActivate] },
    { path: ':id', component: RegisterMaintenanceComponent, canActivate: [CanActivate]},
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ]
})
export class MaintenanceRoutingModule {

    constructor() { }
}
