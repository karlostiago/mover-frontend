import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegisterInvoiceComponent} from "./register-invoce/register-invoice.component";
import {InputSwitchModule} from "primeng/inputswitch";
import {InputTextareaModule} from "primeng/inputtextarea";
import {Button, ButtonDirective} from "primeng/button";
import {SearchInvoiceComponent} from "./search-invoce/search-invoice.component";
import {TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
import {RouterLink} from "@angular/router";
import {InvoiceRoutingModule} from "./invoice-routing.module";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {FileUploadModule} from "primeng/fileupload";
import {SharedModule} from "../../../../shared/SharedModule";
import {SelectBrandIconModule} from "../../../core/components/select-brand-icon/select-brand-icon.module";
import {SidebarDetailsModule} from "../../../core/components/sidebar-details/sidebar-details.module";
import {InvoicePaymentDetailComponent} from "./invoce-payment-detail/invoice-payment-detail.component";
import {InvoiceCardComponent} from "./invoce-card/invoice-card.component";
import {GlobalDialogModule} from "../../../../shared/dialog/global-dialog.module";

@NgModule({
    declarations: [
        RegisterInvoiceComponent,
        SearchInvoiceComponent,
        InvoicePaymentDetailComponent,
        InvoiceCardComponent
    ],
    exports: [
        RegisterInvoiceComponent,
        SearchInvoiceComponent
    ],
    imports: [
        CommonModule,
        InputSwitchModule,
        InputTextareaModule,
        ButtonDirective,
        TableModule,
        InputTextModule,
        RouterLink,
        InvoiceRoutingModule,
        Button,
        DropdownModule,
        FormsModule,
        FileUploadModule,
        SharedModule,
        SelectBrandIconModule,
        SidebarDetailsModule,
        GlobalDialogModule
    ]
})
export class InvoiceModule { }
