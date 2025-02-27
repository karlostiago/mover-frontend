import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScrollUpComponent} from "./scroll-up.component";
import {ButtonDirective} from "primeng/button";

@NgModule({
    declarations: [
        ScrollUpComponent
    ],
    exports: [
        ScrollUpComponent
    ],
    imports: [
        CommonModule,
        ButtonDirective,
    ]
})
export class ScrollUpModule { }
