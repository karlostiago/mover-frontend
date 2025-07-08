import {NgModule} from '@angular/core';
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {DashboardComponent} from "./dashboard.component";
import {ChartModule} from "primeng/chart";
import {ButtonDirective} from "primeng/button";
import {CardIndicatorValueComponent} from "./card-indicator-value/card-indicator-value.component";
import {CardIndicatorComponent} from "./card-indicator/card-indicator.component";
import {CardIndicatorListComponent} from "./card-indicator-list/card-indicator-list.component";
import {CardIndicatorChartComponent} from "./card-indicator-chart/card-indicator-chart.component";

@NgModule({
    declarations: [
        DashboardComponent,
        CardIndicatorValueComponent,
        CardIndicatorComponent,
        CardIndicatorListComponent,
        CardIndicatorChartComponent
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
