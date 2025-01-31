import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MainLayoutComponent} from "./main/main-layout.component";
import {HeaderComponent} from "../header/header.component";
import {MenuLateralComponent} from "../menu/menu-lateral/menu-lateral.component";
import {RouterLink, RouterOutlet} from "@angular/router";
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {LoaderModule} from "../loader/loader.module";
import {LoginComponent} from "../login/login.component";
import {AuthLayoutComponent} from "./auth/auth-layout.component";
import {InputTextModule} from "primeng/inputtext";
import {AutoFocus} from "primeng/autofocus";
import {FormsModule} from "@angular/forms";
import {PasswordModule} from "primeng/password";

@NgModule({
    declarations: [
        MainLayoutComponent,
        AuthLayoutComponent,
        HeaderComponent,
        MenuLateralComponent,
        LoginComponent
    ],
    exports: [

    ],
    imports: [
        CommonModule,
        RouterOutlet,
        ToastModule,
        ConfirmDialogModule,
        LoaderModule,
        RouterLink,
        NgOptimizedImage,
        InputTextModule,
        AutoFocus,
        FormsModule,
        PasswordModule
    ]
})
export class LayoutModule { }
