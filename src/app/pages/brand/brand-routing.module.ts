import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SearchBrandComponent} from "./search-brand/search-brand.component";

const rotas: Routes = [
    {
        path: '',
        component: SearchBrandComponent
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
export class BrandRoutingModule {

    constructor() { }
}
