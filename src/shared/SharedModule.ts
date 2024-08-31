import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {CurrencyFormatPtBrDirective} from "./directive/CurrencyFormatPtBrDirective";
import {OnlyNumberDirective} from "./directive/OnlyNumberDirective";
import {DateFormatPtBrDirecitve} from "./directive/DateFormatPtBrDirecitve";
import {DecimalFormatDirective} from "./directive/DecimalFormatDirective";
import {MaskCpfDirective} from "./directive/MaskCpfDirective";
import {MaskCnpjDirective} from "./directive/MaskCnpjDirective";
import {MaskTelephoneDirective} from "./directive/MaskTelephoneDirective";

@NgModule({
    declarations: [
        CurrencyFormatPtBrDirective,
        OnlyNumberDirective,
        DateFormatPtBrDirecitve,
        DecimalFormatDirective,
        MaskCpfDirective,
        MaskCnpjDirective,
        MaskTelephoneDirective
    ],
    exports: [
        ToastModule,
        CurrencyFormatPtBrDirective,
        OnlyNumberDirective,
        DateFormatPtBrDirecitve,
        DecimalFormatDirective,
        MaskCpfDirective,
        MaskCnpjDirective,
        MaskTelephoneDirective
    ],
    imports: [
        CommonModule
    ],
    providers: [
        MessageService
    ]
})
export class SharedModule {
}
