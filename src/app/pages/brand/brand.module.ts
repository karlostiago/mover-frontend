import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CadastroBrandComponent} from "./cadastro-brand/cadastro-brand.component";
import {InputSwitchModule} from "primeng/inputswitch";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ButtonDirective} from "primeng/button";
import {ConsultaBrandComponent} from "./consulta-brand/consulta-brand.component";
import {TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
import {RouterLink} from "@angular/router";
import {BrandRoutingModule} from "./brand-routing.module";

@NgModule({
    declarations: [
        CadastroBrandComponent,
        ConsultaBrandComponent
    ],
    exports: [
        CadastroBrandComponent,
        ConsultaBrandComponent
    ],
    imports: [
        CommonModule,
        InputSwitchModule,
        InputTextareaModule,
        ButtonDirective,
        TableModule,
        InputTextModule,
        RouterLink,
        BrandRoutingModule
    ]
})
export class BrandModule { }
