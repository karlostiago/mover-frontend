import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {PartnerRoutingModule} from "./partner-routing.module";
import {FormsModule} from "@angular/forms";
import {Button, ButtonDirective} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {TableModule} from "primeng/table";
import {InputSwitchModule} from "primeng/inputswitch";
import {DropdownModule} from "primeng/dropdown";
import {SharedModule} from "../../../../shared/SharedModule";
import {FileUploadModule} from "primeng/fileupload";
import {SearchPartnerComponent} from "./search-partner/search-partner.component";
import {RegisterPartnerComponent} from "./register-partner/register-partner.component";

@NgModule({
    declarations: [
        RegisterPartnerComponent,
        SearchPartnerComponent
    ],
    exports: [
        RegisterPartnerComponent,
        SearchPartnerComponent
    ],
    imports: [
        CommonModule,
        PartnerRoutingModule,
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
export class PartnerModule { }
