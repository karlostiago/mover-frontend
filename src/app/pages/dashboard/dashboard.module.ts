import {NgModule} from '@angular/core';
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {DashboardComponent} from "./dashboard.component";
import {ChartModule} from "primeng/chart";

@NgModule({
    declarations: [
        DashboardComponent
    ],
    exports: [
        DashboardComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        NgOptimizedImage,
        ChartModule
    ]
})
export class DashboardModule { }
