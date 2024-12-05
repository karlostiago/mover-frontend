import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogAddressComponent} from "../../app/pages/client/dialog-address/dialog-address.component";
import {DialogModule} from "primeng/dialog";
import {TableModule} from "primeng/table";
import {GlobalDialogComponent} from "./global-dialog.component";
import {DialogFipeComponent} from "../../app/pages/vehicle/dialog-fipe/dialog-fipe.component";
import {SharedModule} from "../SharedModule";
import {DialogContactComponent} from "../../app/pages/client/dialog-contact/dialog-contact.component";
import {InputTextModule} from "primeng/inputtext";
import {ButtonDirective} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {PaginatorModule} from "primeng/paginator";
import {
    DialogTerminateContractComponent
} from "../../app/pages/contract/dialog-terminate-contract/dialog-terminate-contract.component";
import {InputTextareaModule} from "primeng/inputtextarea";
import {InputSwitchModule} from "primeng/inputswitch";
import {DialogSubcategoryComponent} from "../../app/pages/category/dialog-subcategory/dialog-subcategory.component";

@NgModule({
    declarations: [
        GlobalDialogComponent,
        DialogAddressComponent,
        DialogFipeComponent,
        DialogContactComponent,
        DialogTerminateContractComponent,
        DialogSubcategoryComponent
    ],
    exports: [
        DialogAddressComponent,
        GlobalDialogComponent,
        DialogFipeComponent,
        DialogContactComponent,
        DialogSubcategoryComponent
    ],
    imports: [
        CommonModule,
        DialogModule,
        TableModule,
        SharedModule,
        InputTextModule,
        ButtonDirective,
        FormsModule,
        PaginatorModule,
        InputTextareaModule,
        InputSwitchModule
    ]
})
export class GlobalDialogModule { }
