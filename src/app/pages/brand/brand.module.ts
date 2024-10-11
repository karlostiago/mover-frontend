import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegisterBrandComponent} from "./register-brand/register-brand.component";
import {InputSwitchModule} from "primeng/inputswitch";
import {InputTextareaModule} from "primeng/inputtextarea";
import {Button, ButtonDirective} from "primeng/button";
import {SearchBrandComponent} from "./search-brand/search-brand.component";
import {TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
import {RouterLink} from "@angular/router";
import {BrandRoutingModule} from "./brand-routing.module";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {FileUploadModule} from "primeng/fileupload";
import {SharedModule} from "../../../shared/SharedModule";

@NgModule({
    declarations: [
        RegisterBrandComponent,
        SearchBrandComponent
    ],
    exports: [
        RegisterBrandComponent,
        SearchBrandComponent
    ],
    imports: [
        CommonModule,
        InputSwitchModule,
        InputTextareaModule,
        ButtonDirective,
        TableModule,
        InputTextModule,
        RouterLink,
        BrandRoutingModule,
        Button,
        DropdownModule,
        FormsModule,
        FileUploadModule,
        SharedModule
    ]
})
export class BrandModule { }
