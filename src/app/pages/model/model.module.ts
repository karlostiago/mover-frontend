import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModelRoutingModule} from "./model-routing.module";
import {RegisterModelComponent} from "./register-model/register-model.component";
import {SearchModelComponent} from "./search-model/search-model.component";
import {FormsModule} from "@angular/forms";
import {Button, ButtonDirective} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {TableModule} from "primeng/table";
import {InputSwitchModule} from "primeng/inputswitch";
import {DropdownModule} from "primeng/dropdown";

@NgModule({
    declarations: [
        RegisterModelComponent,
        SearchModelComponent
    ],
    exports: [
        RegisterModelComponent,
        SearchModelComponent
    ],
    imports: [
        CommonModule,
        ModelRoutingModule,
        FormsModule,
        ButtonDirective,
        InputTextModule,
        TableModule,
        Button,
        InputSwitchModule,
        DropdownModule
    ]
})
export class ModelModule { }
