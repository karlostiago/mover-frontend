import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SearchChangePasswordComponent} from "./search-change-password/search-change-password.component";

const rotas: Routes = [
    {
        path: '',
        component: SearchChangePasswordComponent
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
export class ChangePasswordRoutingModule {

    constructor() { }
}
