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
import {CoreModule} from "../../core/core.module";
import {CurrencyFormatPtBrDirective} from "../../../shared/directive/CurrencyFormatPtBrDirective";
import {SharedModule} from "../../../shared/SharedModule";
import {FileUploadModule} from "primeng/fileupload";

@NgModule({
    declarations: [
        RegisterAccountComponent,
        SearchAccountComponent
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
        FileUploadModule,
        NgOptimizedImage
    ]
})
export class AccountModule { }
