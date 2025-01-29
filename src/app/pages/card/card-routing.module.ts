import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SearchCardComponent} from "./search-card/search-card.component";

const rotas: Routes = [
    {
        path: '',
        component: SearchCardComponent
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
export class CardRoutingModule {

    constructor() { }
}
