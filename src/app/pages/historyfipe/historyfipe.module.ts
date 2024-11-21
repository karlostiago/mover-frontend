import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HistoryfipeRoutingModule} from "./historyfipe-routing.module";
import {SearchHistoryfipeComponent} from "./search-historyfipe/search-historyfipe.component";
import {FormsModule} from "@angular/forms";
import {Button, ButtonDirective} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {TableModule} from "primeng/table";
import {InputSwitchModule} from "primeng/inputswitch";
import {DropdownModule} from "primeng/dropdown";
import {DialogModule} from "primeng/dialog";
import {SharedModule} from "../../../shared/SharedModule";
import {InputTextareaModule} from "primeng/inputtextarea";
import {SimpleTableHistoryfipeComponent} from "./simple-table/simple-table-historyfipe.component";
import {GroupTableHistoryfipeComponent} from "./group-table/group-table-historyfipe.component";

@NgModule({
    declarations: [
        SearchHistoryfipeComponent,
        SimpleTableHistoryfipeComponent,
        GroupTableHistoryfipeComponent
    ],
    exports: [
        SearchHistoryfipeComponent
    ],
    imports: [
        CommonModule,
        HistoryfipeRoutingModule,
        FormsModule,
        ButtonDirective,
        InputTextModule,
        TableModule,
        Button,
        InputSwitchModule,
        DropdownModule,
        DialogModule,
        SharedModule,
        InputTextareaModule
    ]
})
export class HistoryfipeModule { }
