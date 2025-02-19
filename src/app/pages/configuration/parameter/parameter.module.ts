import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ParameterRoutingModule} from "./parameter-routing.module";
import {RegisterParameterComponent} from "./register-parameter/register-parameter.component";
import {SearchParameterComponent} from "./search-parameter/search-parameter.component";
import {FormsModule} from "@angular/forms";
import {Button, ButtonDirective} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {TableModule} from "primeng/table";
import {InputSwitchModule} from "primeng/inputswitch";
import {DropdownModule} from "primeng/dropdown";
import {SharedModule} from "../../../../shared/SharedModule";

@NgModule({
    declarations: [
        RegisterParameterComponent,
        SearchParameterComponent
    ],
    exports: [
        RegisterParameterComponent,
        SearchParameterComponent
    ],
    imports: [
        CommonModule,
        ParameterRoutingModule,
        FormsModule,
        ButtonDirective,
        InputTextModule,
        TableModule,
        Button,
        InputSwitchModule,
        DropdownModule,
        SharedModule
    ]
})
export class ParameterModule { }
