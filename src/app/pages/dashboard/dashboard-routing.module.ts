import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard.component";

const routes: Routes = [
    {
        path: 'dashboard/home',
        component: DashboardComponent
    }
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