import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ConfirmationService} from "primeng/api";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {DashboardModule} from "../pages/dashboard/dashboard.module";
import {GlobalDialogModule} from "../../shared/dialog/global-dialog.module";
import {SecurityModule} from "../pages/security/security.module";
import {ClientsModule} from "../pages/clients/clients.module";
import {FleetModule} from "../pages/fleets/fleet.module";
import {ConfigurationModule} from "../pages/configuration/configuration.module";
import {MoneyModule} from "../pages/money/money.module";

@NgModule({
    declarations: [ ],
    exports: [
        GlobalDialogModule,
        DashboardModule,

        SecurityModule,
        ClientsModule,
        FleetModule,
        ConfigurationModule,
        MoneyModule
    ],
    imports: [
        CommonModule,
        NgOptimizedImage,
        RouterLinkActive,
        RouterLink
    ],
    providers: [
        ConfirmationService
    ]
})
export class CoreModule { }
