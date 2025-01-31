import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SearchUserComponent} from "./search-user/search-user.component";

const rotas: Routes = [
    {
        path: '',
        component: SearchUserComponent
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
export class UserRoutingModule {

    constructor() { }
}
