import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {Button} from "primeng/button";
import {HeaderComponent} from "./core/header/header.component";
import {NgOptimizedImage} from "@angular/common";
import { MenuLateralComponent } from './core/menu/menu-lateral/menu-lateral.component';
import { LogoComponent } from './core/logo/logo.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuLateralComponent,
    LogoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Button,
    NgOptimizedImage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
