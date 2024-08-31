import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ClientRoutingModule} from "./client-routing.module";
import {FormsModule} from "@angular/forms";
import {Button, ButtonDirective} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {TableModule} from "primeng/table";
import {InputSwitchModule} from "primeng/inputswitch";
import {DropdownModule} from "primeng/dropdown";
import {SharedModule} from "../../../shared/SharedModule";
import {FileUploadModule} from "primeng/fileupload";
import {SearchClientComponent} from "./search-client/search-client.component";
import {RegisterClientComponent} from "./register-client/register-client.component";

@NgModule({
    declarations: [
        RegisterClientComponent,
        SearchClientComponent
    ],
    exports: [
        RegisterClientComponent,
        SearchClientComponent
    ],
    imports: [
        CommonModule,
        ClientRoutingModule,
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
export class ClientModule { }
