import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {BrandModule} from "../pages/brand/brand.module";
import {HeaderComponent} from "./header/header.component";
import {MenuLateralComponent} from "./menu/menu-lateral/menu-lateral.component";
import {ConfirmationService} from "primeng/api";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {DashboardModule} from "../pages/dashboard/dashboard.module";
import {ModelModule} from "../pages/model/model.module";
import {VehicleModule} from "../pages/vehicle/vehicle.module";
import {AccountModule} from "../pages/account/account.module";
import {ClientModule} from "../pages/client/client.module";
import {GlobalDialogModule} from "../../shared/dialog/global-dialog.module";
import {ConfigurationModule} from "../pages/configuration/configuration.module";
import {CardModule} from "../pages/card/card.module";
import {CategoryModule} from "../pages/category/category.module";
import {SubcategoryModule} from "../pages/subcategory/subcategory.module";
import {PartnerModule} from "../pages/partner/partner.module";
import {ContractModule} from "../pages/contract/contract.module";
import {MaintenanceModule} from "../pages/maintenance/maintenance.module";
import {HistoryfipeModule} from "../pages/historyfipe/historyfipe.module";
import {TransactionModule} from "../pages/transaction/transaction.module";

@NgModule({
    declarations: [
        HeaderComponent,
        MenuLateralComponent
    ],
    exports: [
        GlobalDialogModule,
        DashboardModule,
        BrandModule,
        ModelModule,
        VehicleModule,
        AccountModule,
        ClientModule,
        ConfigurationModule,
        CategoryModule,
        SubcategoryModule,
        CardModule,
        PartnerModule,
        ContractModule,
        MaintenanceModule,
        HistoryfipeModule,
        TransactionModule,
        HeaderComponent,
        MenuLateralComponent
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
