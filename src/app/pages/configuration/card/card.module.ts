import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {CardRoutingModule} from "./card-routing.module";
import {FormsModule} from "@angular/forms";
import {Button, ButtonDirective} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {TableModule} from "primeng/table";
import {InputSwitchModule} from "primeng/inputswitch";
import {DropdownModule} from "primeng/dropdown";
import {RegisterCardComponent} from "./register-card/register-card.component";
import {SearchCardComponent} from "./search-card/search-card.component";
import {SharedModule} from "../../../../shared/SharedModule";
import {FileUploadModule} from "primeng/fileupload";
import {FieldsetModule} from "primeng/fieldset";
import {SelectBankIconModule} from "../../../core/components/select-bank-icon/select-bank-icon.module";

@NgModule({
    declarations: [
        RegisterCardComponent,
        SearchCardComponent
    ],
    exports: [
        RegisterCardComponent,
        SearchCardComponent
    ],
    imports: [
        CommonModule,
        CardRoutingModule,
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
        FieldsetModule,
        SelectBankIconModule
    ]
})
export class CardModule { }
