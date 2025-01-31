import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SearchProfileComponent} from "./search-profile/search-profile.component";

const rotas: Routes = [
    {
        path: '',
        component: SearchProfileComponent
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
export class ProfileRoutingModule {

    constructor() { }
}
