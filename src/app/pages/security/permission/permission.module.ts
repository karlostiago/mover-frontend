import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {PermissionRoutingModule} from "./permission-routing.module";
import {FormsModule} from "@angular/forms";
import {Button, ButtonDirective} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {TableModule} from "primeng/table";
import {InputSwitchModule} from "primeng/inputswitch";
import {DropdownModule} from "primeng/dropdown";
import {FileUploadModule} from "primeng/fileupload";
import {SearchPermissionComponent} from "./search-permission/search-permission.component";
import {RegisterPermissionComponent} from "./register-permission/register-permission.component";
import {SharedModule} from "../../../../shared/SharedModule";

@NgModule({
    declarations: [
        RegisterPermissionComponent,
        SearchPermissionComponent
    ],
    exports: [
        RegisterPermissionComponent,
        SearchPermissionComponent
    ],
    imports: [
        CommonModule,
        PermissionRoutingModule,
        FormsModule,
        ButtonDirective,
        InputTextModule,
        TableModule,
        Button,
        InputSwitchModule,
        DropdownModule,
        SharedModule,
        FileUploadModule,
        NgOptimizedImage,
        SharedModule
    ]
})
export class PermissionModule { }
