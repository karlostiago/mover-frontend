import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainLayoutComponent} from "./core/layout/main/main-layout.component";
import {AuthLayoutComponent} from "./core/layout/auth/auth-layout.component";
import {routers} from "./core/routers";

const rotas: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: routers
    },
    {
        path: 'login',
        component: AuthLayoutComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
]

@NgModule({
    imports: [RouterModule.forRoot(rotas)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
