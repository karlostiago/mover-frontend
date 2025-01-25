import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelectBankIconComponent} from "./select-bank-icon.component";

@NgModule({
    declarations: [
        SelectBankIconComponent
    ],
    exports: [
        SelectBankIconComponent
    ],
    imports: [
        CommonModule,
    ]
})
export class SelectBankIconModule { }
