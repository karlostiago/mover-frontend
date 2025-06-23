import {NgModule} from '@angular/core';
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {CommonModule, NgOptimizedImage} from "@angular/common";
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
        DashboardRoutingModule,
        NgOptimizedImage
    ]
})
export class DashboardModule { }
