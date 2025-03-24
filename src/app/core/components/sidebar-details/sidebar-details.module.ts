import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarDetailsComponent} from "./sidebar-details.component";
import {ButtonDirective} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {SidebarModule} from "primeng/sidebar";
import {InputTextModule} from "primeng/inputtext";

@NgModule({
    declarations: [
        SidebarDetailsComponent
    ],
    exports: [
        SidebarDetailsComponent
    ],
    imports: [
        CommonModule,
        ButtonDirective,
        FormsModule,
        SidebarModule,
        InputTextModule,
    ]
})
export class SidebarDetailsModule { }
