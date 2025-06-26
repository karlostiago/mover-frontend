import {NgModule} from '@angular/core';
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {DashboardComponent} from "./dashboard.component";
import {ChartModule} from "primeng/chart";
import {ButtonDirective} from "primeng/button";

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
        ChartModule,
        ButtonDirective
    ]
})
export class DashboardModule { }
