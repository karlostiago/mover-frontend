import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {RegisterCardComponent} from "./register-card/register-card.component";
import {SearchCardComponent} from "./search-card/search-card.component";

const rotas: Routes = [
    {
        path: 'search/cards',
        component: SearchCardComponent
    },
    {
        path: 'register/cards/new',
        component: RegisterCardComponent
    },
    {
        path: 'update/cards/:id',
        component: RegisterCardComponent
    },
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
