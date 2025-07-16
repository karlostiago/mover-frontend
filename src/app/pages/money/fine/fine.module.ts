import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FineRoutingModule} from "./fine-routing.module";
import {FormsModule} from "@angular/forms";
import {Button, ButtonDirective} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {TableModule} from "primeng/table";
import {InputSwitchModule} from "primeng/inputswitch";
import {DropdownModule} from "primeng/dropdown";
import {RegisterFineComponent} from "./register-fine/register-fine.component";
import {SearchFineComponent} from "./search-fine/search-fine.component";
import {SharedModule} from "../../../../shared/SharedModule";
import {SelectBankIconModule} from "../../../core/components/select-bank-icon/select-bank-icon.module";
import {InputTextareaModule} from "primeng/inputtextarea";
import {CalendarModule} from "primeng/calendar";

@NgModule({
    declarations: [
        RegisterFineComponent,
        SearchFineComponent
    ],
    exports: [
        RegisterFineComponent,
        SearchFineComponent
    ],
    imports: [
        CommonModule,
        FineRoutingModule,
        FormsModule,
        ButtonDirective,
        InputTextModule,
        TableModule,
        Button,
        InputSwitchModule,
        DropdownModule,
        SharedModule,
        SelectBankIconModule,
        InputTextareaModule,
        CalendarModule
    ]
})
export class FineModule { }
