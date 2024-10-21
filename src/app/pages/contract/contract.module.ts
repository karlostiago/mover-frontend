import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContractRoutingModule} from "./contract-routing.module";
import {RegisterContractComponent} from "./register-contract/register-contract.component";
import {SearchContractComponent} from "./search-contract/search-contract.component";
import {FormsModule} from "@angular/forms";
import {Button, ButtonDirective} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {TableModule} from "primeng/table";
import {InputSwitchModule} from "primeng/inputswitch";
import {DropdownModule} from "primeng/dropdown";
import {DialogModule} from "primeng/dialog";
import {SharedModule} from "../../../shared/SharedModule";
import {InputTextareaModule} from "primeng/inputtextarea";
import {SpeedDialModule} from "primeng/speeddial";

@NgModule({
    declarations: [
        RegisterContractComponent,
        SearchContractComponent
    ],
    exports: [
        RegisterContractComponent,
        SearchContractComponent
    ],
    imports: [
        CommonModule,
        ContractRoutingModule,
        FormsModule,
        ButtonDirective,
        InputTextModule,
        TableModule,
        Button,
        InputSwitchModule,
        DropdownModule,
        DialogModule,
        SharedModule,
        InputTextareaModule,
        SpeedDialModule
    ]
})
export class ContractModule { }
