import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ProfileRoutingModule} from "./profile-routing.module";
import {FormsModule} from "@angular/forms";
import {Button, ButtonDirective} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {TableModule} from "primeng/table";
import {InputSwitchModule} from "primeng/inputswitch";
import {DropdownModule} from "primeng/dropdown";
import {FileUploadModule} from "primeng/fileupload";
import {SearchProfileComponent} from "./search-profile/search-profile.component";
import {RegisterProfileComponent} from "./register-profile/register-profile.component";
import {SharedModule} from "../../../../shared/SharedModule";

@NgModule({
    declarations: [
        RegisterProfileComponent,
        SearchProfileComponent
    ],
    exports: [
        RegisterProfileComponent,
        SearchProfileComponent
    ],
    imports: [
        CommonModule,
        ProfileRoutingModule,
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
export class ProfileModule { }
