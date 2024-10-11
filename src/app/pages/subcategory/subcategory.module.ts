import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SubcategoryRoutingModule} from "./subcategory-routing.module";
import {RegisterSubcategoryComponent} from "./register-subcategory/register-subcategory.component";
import {SearchSubcategoryComponent} from "./search-subcategory/search-subcategory.component";
import {FormsModule} from "@angular/forms";
import {Button, ButtonDirective} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {TableModule} from "primeng/table";
import {InputSwitchModule} from "primeng/inputswitch";
import {DropdownModule} from "primeng/dropdown";
import {DialogModule} from "primeng/dialog";
import {SharedModule} from "../../../shared/SharedModule";

@NgModule({
    declarations: [
        RegisterSubcategoryComponent,
        SearchSubcategoryComponent
    ],
    exports: [
        RegisterSubcategoryComponent,
        SearchSubcategoryComponent
    ],
    imports: [
        CommonModule,
        SubcategoryRoutingModule,
        FormsModule,
        ButtonDirective,
        InputTextModule,
        TableModule,
        Button,
        InputSwitchModule,
        DropdownModule,
        DialogModule,
        SharedModule
    ]
})
export class SubcategoryModule { }
