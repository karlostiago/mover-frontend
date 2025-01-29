import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SearchPartnerComponent} from "./search-partner/search-partner.component";

const rotas: Routes = [
    {
        path: '',
        component: SearchPartnerComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(rotas),
    ],
    exports: [
        RouterModule
    ]
})
export class PartnerRoutingModule {

    constructor() { }
}
