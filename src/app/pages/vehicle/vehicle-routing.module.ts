import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SearchVehicleComponent} from "./search-vehicle/search-vehicle.component";
import {RegisterVehicleComponent} from "./register-vehicle/register-vehicle.component";

const rotas: Routes = [
    {
        path: 'search/vehicles',
        component: SearchVehicleComponent
    },
    {
        path: 'register/vehicles/new',
        component: RegisterVehicleComponent
    },
    {
        path: 'update/vehicles/:id',
        component: RegisterVehicleComponent
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
export class VehicleRoutingModule {

    constructor() { }
}
