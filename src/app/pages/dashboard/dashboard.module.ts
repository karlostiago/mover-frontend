import {NgModule} from '@angular/core';
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {CommonModule} from "@angular/common";
import {DashboardComponent} from "./dashboard.component";

@NgModule({
    declarations: [
        DashboardComponent
    ],
    exports: [
        DashboardComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule
    ]
})
export class DashboardModule { }
