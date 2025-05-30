import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard.component";
import {CanActivate} from "../../core/login/AuthGuard";

const routes: Routes = [
    { path: '', component: DashboardComponent, canActivate: [CanActivate] },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ]
})
export class DashboardRoutingModule {

    constructor() { }
}
