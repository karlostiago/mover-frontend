import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgOptimizedImage, registerLocaleData} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CoreModule} from "./core/core.module";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {SharedModule} from "../shared/SharedModule";
import {HttpClientModule} from "@angular/common/http";
import {LoaderModule} from "./core/loader/loader.module";
import localePt from '@angular/common/locales/pt';
import {LayoutModule} from "./core/layout/layout.module";

registerLocaleData(localePt, 'pt-BR');

@NgModule({
    declarations: [
        AppComponent
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
        LoaderModule,

        LayoutModule
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'pt-BR' }
    ],
    exports: [

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
