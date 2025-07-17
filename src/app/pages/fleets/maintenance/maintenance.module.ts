import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaintenanceRoutingModule} from "./maintenance-routing.module";
import {RegisterMaintenanceComponent} from "./register-maintenance/register-maintenance.component";
import {SearchMaintenanceComponent} from "./search-maintenance/search-maintenance.component";
import {FormsModule} from "@angular/forms";
import {Button, ButtonDirective} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {TableModule} from "primeng/table";
import {InputSwitchModule} from "primeng/inputswitch";
import {DropdownModule} from "primeng/dropdown";
import {DialogModule} from "primeng/dialog";
import {SharedModule} from "../../../../shared/SharedModule";
import {InputTextareaModule} from "primeng/inputtextarea";
import {SidebarDetailsModule} from "../../../core/components/sidebar-details/sidebar-details.module";
import {CalendarModule} from "primeng/calendar";
import {TableMaintenanceComponent} from "./table-maintenance/table-maintenance.component";

@NgModule({
    declarations: [
        RegisterMaintenanceComponent,
        SearchMaintenanceComponent,
        TableMaintenanceComponent
    ],
    exports: [
        RegisterMaintenanceComponent,
        SearchMaintenanceComponent
    ],
    imports: [
        CommonModule,
        MaintenanceRoutingModule,
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
        SidebarDetailsModule,
        CalendarModule
    ]
})
export class MaintenanceModule { }
