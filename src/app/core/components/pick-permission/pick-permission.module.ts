import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PickPermissionComponent} from "./pick-permission.component";
import {ButtonDirective} from "primeng/button";

@NgModule({
    declarations: [
        PickPermissionComponent
    ],
    exports: [
        PickPermissionComponent
    ],
    imports: [
        CommonModule,
        ButtonDirective,
    ]
})
export class PickPermissionModule { }
