import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VehicleRoutingModule} from "./vehicle-routing.module";
import {RegisterVehicleComponent} from "./register-vehicle/register-vehicle.component";
import {SearchVehicleComponent} from "./search-vehicle/search-vehicle.component";
import {FormsModule} from "@angular/forms";
import {Button, ButtonDirective} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {TableModule} from "primeng/table";
import {InputSwitchModule} from "primeng/inputswitch";
import {DropdownModule} from "primeng/dropdown";
import {DialogModule} from "primeng/dialog";
import {SharedModule} from "../../../../shared/SharedModule";
import {TooltipModule} from "primeng/tooltip";

@NgModule({
    declarations: [
        RegisterVehicleComponent,
        SearchVehicleComponent
    ],
    exports: [
        RegisterVehicleComponent,
        SearchVehicleComponent
    ],
    imports: [
        CommonModule,
        VehicleRoutingModule,
        FormsModule,
        ButtonDirective,
        InputTextModule,
        TableModule,
        Button,
        InputSwitchModule,
        DropdownModule,
        DialogModule,
        SharedModule,
        TooltipModule
    ]
})
export class VehicleModule { }
