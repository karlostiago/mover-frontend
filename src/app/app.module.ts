import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {Button} from "primeng/button";
import {HeaderComponent} from "./core/header/header.component";
import {NgOptimizedImage} from "@angular/common";
import { MenuLateralComponent } from './core/menu/menu-lateral/menu-lateral.component';
import { LogoComponent } from './core/logo/logo.component';
import { MainComponent } from './core/main/main.component';
import { BreadcrumbComponent } from './core/breadcrumb/breadcrumb.component';
import {BreadcrumbModule} from "primeng/breadcrumb";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuLateralComponent,
    LogoComponent,
    MainComponent,
    BreadcrumbComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        Button,
        NgOptimizedImage,
        BreadcrumbModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
