import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoryRoutingModule} from "./category-routing.module";
import {RegisterCategoryComponent} from "./register-category/register-category.component";
import {SearchCategoryComponent} from "./search-category/search-category.component";
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
        RegisterCategoryComponent,
        SearchCategoryComponent
    ],
    exports: [
        RegisterCategoryComponent,
        SearchCategoryComponent
    ],
    imports: [
        CommonModule,
        CategoryRoutingModule,
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
export class CategoryModule { }
