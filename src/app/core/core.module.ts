import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {BrandModule} from "../pages/brand/brand.module";
import {HeaderComponent} from "./header/header.component";
import {MenuLateralComponent} from "./menu/menu-lateral/menu-lateral.component";
import {ConfirmationService} from "primeng/api";

@NgModule({
    declarations: [
        HeaderComponent,
        MenuLateralComponent
    ],
    exports: [
        BrandModule,
        HeaderComponent,
        MenuLateralComponent
    ],
    imports: [
        CommonModule,
        NgOptimizedImage
    ],
    providers: [
        ConfirmationService
    ]
})
export class CoreModule { }
