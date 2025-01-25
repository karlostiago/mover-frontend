import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelectIconComponent} from "./select-icon.component";

@NgModule({
    declarations: [
        SelectIconComponent
    ],
    exports: [
        SelectIconComponent
    ],
    imports: [
        CommonModule,
    ]
})
export class SelectIconModule { }
