import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SearchVehicleComponent} from "./search-vehicle/search-vehicle.component";
import {CanActivate} from "../../../core/login/AuthGuard";
import {RegisterVehicleComponent} from "./register-vehicle/register-vehicle.component";

const routes: Routes = [
    { path: '', component: SearchVehicleComponent, canActivate: [CanActivate] },
    { path: 'new', component: RegisterVehicleComponent, canActivate: [CanActivate] },
    { path: ':id', component: RegisterVehicleComponent, canActivate: [CanActivate] },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ]
})
export class VehicleRoutingModule {

    constructor() { }
}
