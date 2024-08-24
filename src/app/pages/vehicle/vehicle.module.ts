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
import {OnlyNumberDirective} from "../../../shared/directive/OnlyNumberDirective";
import {CoreModule} from "../../core/core.module";
import {DateFormatPtBrDirecitve} from "../../../shared/directive/DateFormatPtBrDirecitve";
import {CurrencyFormatPtBrDirective} from "../../../shared/directive/CurrencyFormatPtBrDirective";
import {DecimalFormatDirective} from "../../../shared/directive/DecimalFormatDirective";
import {DialogModule} from "primeng/dialog";
import {DialogFipeComponent} from "./dialog-fipe/dialog-fipe.component";

@NgModule({
    declarations: [
        RegisterVehicleComponent,
        SearchVehicleComponent,
        OnlyNumberDirective,
        DateFormatPtBrDirecitve,
        CurrencyFormatPtBrDirective,
        DecimalFormatDirective,
        DialogFipeComponent
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
        DialogModule
    ]
})
export class VehicleModule { }
