import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ChangePasswordRoutingModule} from "./change-password-routing.module";
import {FormsModule} from "@angular/forms";
import {Button, ButtonDirective} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {TableModule} from "primeng/table";
import {InputSwitchModule} from "primeng/inputswitch";
import {DropdownModule} from "primeng/dropdown";
import {FileUploadModule} from "primeng/fileupload";
import {SearchChangePasswordComponent} from "./search-change-password/search-change-password.component";
import {RegisterChangePasswordComponent} from "./register-change-password/register-change-password.component";
import {SharedModule} from "../../../../shared/SharedModule";
import {MultiSelectModule} from "primeng/multiselect";

@NgModule({
    declarations: [
        RegisterChangePasswordComponent,
        SearchChangePasswordComponent
    ],
    exports: [
        RegisterChangePasswordComponent,
        SearchChangePasswordComponent
    ],
    imports: [
        CommonModule,
        ChangePasswordRoutingModule,
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
        MultiSelectModule
    ]
})
export class ChangePasswordModule { }
