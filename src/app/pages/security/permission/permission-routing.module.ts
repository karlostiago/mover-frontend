import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SearchPermissionComponent} from "./search-permission/search-permission.component";

const rotas: Routes = [
    {
        path: '',
        component: SearchPermissionComponent
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
export class PermissionRoutingModule {

    constructor() { }
}
