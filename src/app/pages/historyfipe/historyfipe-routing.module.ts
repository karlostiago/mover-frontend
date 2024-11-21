import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SearchHistoryfipeComponent} from "./search-historyfipe/search-historyfipe.component";

const rotas: Routes = [
    {
        path: 'search/history-fipe',
        component: SearchHistoryfipeComponent
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
export class HistoryfipeRoutingModule {

    constructor() { }
}
