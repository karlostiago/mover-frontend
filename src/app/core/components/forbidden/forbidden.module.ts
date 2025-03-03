import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ForbiddenComponent} from "./forbidden.component";
import {ButtonDirective} from "primeng/button";
import {FormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        ForbiddenComponent
    ],
    exports: [
        ForbiddenComponent
    ],
    imports: [
        CommonModule,
        ButtonDirective,
        FormsModule,
    ]
})
export class ForbiddenModule { }
