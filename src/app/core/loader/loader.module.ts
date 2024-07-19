import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoaderComponent} from "./loader.component";
import {NgxLoadingModule} from "ngx-loading";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {LoaderInterceptor} from "./LoaderInterceptor";
import {ProgressSpinnerModule} from "primeng/progressspinner";

@NgModule({
    declarations: [
        LoaderComponent
    ],
    exports: [
        LoaderComponent
    ],
    imports: [
        CommonModule,
        NgxLoadingModule.forRoot({
            fullScreenBackdrop: true
        }),
        ProgressSpinnerModule
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true}
    ]
})
export class LoaderModule {
}
