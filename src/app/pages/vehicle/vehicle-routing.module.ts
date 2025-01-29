import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SearchVehicleComponent} from "./search-vehicle/search-vehicle.component";

const rotas: Routes = [
    {
        path: '',
        component: SearchVehicleComponent
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
export class VehicleRoutingModule {

    constructor() { }
}
