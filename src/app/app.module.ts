import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgOptimizedImage} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {CoreModule} from "./core/core.module";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {SharedModule} from "../shared/SharedModule";
import {HttpClientModule} from "@angular/common/http";
import {LoaderModule} from "./core/loader/loader.module";

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NgOptimizedImage,

        CoreModule,
        SharedModule,
        ConfirmDialogModule,
        LoaderModule
    ],
    providers: [

    ],
    exports: [

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
