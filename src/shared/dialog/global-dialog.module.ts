import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogAddressComponent} from "../../app/pages/client/dialog-address/dialog-address.component";
import {DialogModule} from "primeng/dialog";
import {TableModule} from "primeng/table";
import {GlobalDialogComponent} from "./global-dialog.component";
import {DialogFipeComponent} from "../../app/pages/vehicle/dialog-fipe/dialog-fipe.component";
import {SharedModule} from "../SharedModule";

@NgModule({
    declarations: [
        GlobalDialogComponent,
        DialogAddressComponent,
        DialogFipeComponent
    ],
    exports: [
        DialogAddressComponent,
        GlobalDialogComponent,
        DialogFipeComponent
    ],
    imports: [
        CommonModule,
        DialogModule,
        TableModule,
        SharedModule
    ]
})
export class GlobalDialogModule { }
