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
import {DialogFipeComponent} from "./dialog-fipe/dialog-fipe.component";
import {SharedModule} from "../../../shared/SharedModule";

@NgModule({
    declarations: [
        RegisterVehicleComponent,
        SearchVehicleComponent,
        DialogFipeComponent
    ],
    exports: [
        RegisterVehicleComponent,
        SearchVehicleComponent,
        DialogFipeComponent
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
        SharedModule
    ]
})
export class VehicleModule { }
