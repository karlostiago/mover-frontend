import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {BrandModule} from "../pages/brand/brand.module";
import {HeaderComponent} from "./header/header.component";
import {MenuLateralComponent} from "./menu/menu-lateral/menu-lateral.component";
import {ConfirmationService} from "primeng/api";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {DashboardModule} from "../pages/dashboard/dashboard.module";
import {ModelModule} from "../pages/model/model.module";

@NgModule({
    declarations: [
        HeaderComponent,
        MenuLateralComponent
    ],
    exports: [
        DashboardModule,
        BrandModule,
        ModelModule,
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
