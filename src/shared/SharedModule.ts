import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";

@NgModule({
    declarations: [],
    exports: [
        ToastModule
    ],
    imports: [
        CommonModule,
    ],
    providers: [
        MessageService
    ]
})
export class SharedModule {
}
