import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfigurationRoutingModule} from "./configuration-routing.module";
import {RegisterConfigurationComponent} from "./register-configuration/register-configuration.component";
import {SearchConfigurationComponent} from "./search-configuration/search-configuration.component";
import {FormsModule} from "@angular/forms";
import {Button, ButtonDirective} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {TableModule} from "primeng/table";
import {InputSwitchModule} from "primeng/inputswitch";
import {DropdownModule} from "primeng/dropdown";
import {SharedModule} from "../../../shared/SharedModule";

@NgModule({
    declarations: [
        RegisterConfigurationComponent,
        SearchConfigurationComponent
    ],
    exports: [
        RegisterConfigurationComponent,
        SearchConfigurationComponent
    ],
    imports: [
        CommonModule,
        ConfigurationRoutingModule,
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
export class ConfigurationModule { }
