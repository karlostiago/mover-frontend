import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MainLayoutComponent} from "./main/main-layout.component";
import {HeaderComponent} from "../header/header.component";
import {MenuLateralComponent} from "../menu/menu-lateral/menu-lateral.component";
import {RouterLink, RouterOutlet} from "@angular/router";
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {LoaderModule} from "../loader/loader.module";

@NgModule({
    declarations: [
        MainLayoutComponent,
        HeaderComponent,
        MenuLateralComponent
    ],
    exports: [
        MainLayoutComponent,
        HeaderComponent,
        MenuLateralComponent
    ],
    imports: [
        CommonModule,
        RouterOutlet,
        ToastModule,
        ConfirmDialogModule,
        LoaderModule,
        RouterLink,
        NgOptimizedImage
    ]
})
export class LayoutModule { }
