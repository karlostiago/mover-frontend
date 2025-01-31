import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {UserRoutingModule} from "./user-routing.module";
import {FormsModule} from "@angular/forms";
import {Button, ButtonDirective} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {TableModule} from "primeng/table";
import {InputSwitchModule} from "primeng/inputswitch";
import {DropdownModule} from "primeng/dropdown";
import {FileUploadModule} from "primeng/fileupload";
import {SearchUserComponent} from "./search-user/search-user.component";
import {RegisterUserComponent} from "./register-user/register-user.component";
import {SharedModule} from "../../../../shared/SharedModule";

@NgModule({
    declarations: [
        RegisterUserComponent,
        SearchUserComponent
    ],
    exports: [
        RegisterUserComponent,
        SearchUserComponent
    ],
    imports: [
        CommonModule,
        UserRoutingModule,
        FormsModule,
        ButtonDirective,
        InputTextModule,
        TableModule,
        Button,
        InputSwitchModule,
        DropdownModule,
        SharedModule,
        FileUploadModule,
        NgOptimizedImage
    ]
})
export class UserModule { }
