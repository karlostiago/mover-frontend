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

@NgModule({
    declarations: [
        GlobalDialogComponent,
        DialogAddressComponent,
        DialogFipeComponent,
        DialogContactComponent
    ],
    exports: [
        DialogAddressComponent,
        GlobalDialogComponent,
        DialogFipeComponent,
        DialogContactComponent
    ],
    imports: [
        CommonModule,
        DialogModule,
        TableModule,
        SharedModule,
        InputTextModule,
        ButtonDirective,
        FormsModule,
        PaginatorModule
    ]
})
export class GlobalDialogModule { }
