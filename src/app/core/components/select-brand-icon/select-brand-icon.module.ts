import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelectBrandIconComponent} from "./select-brand-icon.component";

@NgModule({
    declarations: [
        SelectBrandIconComponent
    ],
    exports: [
        SelectBrandIconComponent
    ],
    imports: [
        CommonModule,
    ]
})
export class SelectBrandIconModule { }
