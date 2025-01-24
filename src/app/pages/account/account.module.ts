import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {AccountRoutingModule} from "./account-routing.module";
import {FormsModule} from "@angular/forms";
import {Button, ButtonDirective} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {TableModule} from "primeng/table";
import {InputSwitchModule} from "primeng/inputswitch";
import {DropdownModule} from "primeng/dropdown";
import {RegisterAccountComponent} from "./register-account/register-account.component";
import {SearchAccountComponent} from "./search-account/search-account.component";
import {SharedModule} from "../../../shared/SharedModule";
import {DialogModule} from "primeng/dialog";
import {SelectIconAccountComponent} from "./select-icon-account/select-icon-account.component";

@NgModule({
    declarations: [
        RegisterAccountComponent,
        SearchAccountComponent,
        SelectIconAccountComponent
    ],
    exports: [
        RegisterAccountComponent,
        SearchAccountComponent
    ],
    imports: [
        CommonModule,
        AccountRoutingModule,
        FormsModule,
        ButtonDirective,
        InputTextModule,
        TableModule,
        Button,
        InputSwitchModule,
        DropdownModule,
        SharedModule,
        NgOptimizedImage,
        DialogModule
    ]
})
export class AccountModule { }
