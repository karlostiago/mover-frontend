import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VehicleModule} from "./vehicle/vehicle.module";
import {MaintenanceModule} from "./maintenance/maintenance.module";

@NgModule({
    declarations: [

    ],
    exports: [

    ],
    imports: [
        CommonModule,
        VehicleModule,
        MaintenanceModule
    ]
})
export class FleetModule { }
