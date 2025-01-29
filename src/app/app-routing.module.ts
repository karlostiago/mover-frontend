import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainLayoutComponent} from "./core/layout/main/main-layout.component";
import {SearchClientComponent} from "./pages/client/search-client/search-client.component";
import {SearchContractComponent} from "./pages/contract/search-contract/search-contract.component";
import {RegisterClientComponent} from "./pages/client/register-client/register-client.component";
import {AuthLayoutComponent} from "./core/layout/auth/auth-layout.component";
import {RegisterContractComponent} from "./pages/contract/register-contract/register-contract.component";

const rotas: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: 'clients', component: SearchClientComponent },
            { path: 'clients/new', component: RegisterClientComponent },
            { path: 'clients/:id', component: RegisterClientComponent },

            { path: 'contracts', component: SearchContractComponent },
            { path: 'contracts/new', component: RegisterContractComponent },
            { path: 'contracts/:id', component: RegisterContractComponent },
        ]
    },
    {
        path: 'login',
        component: AuthLayoutComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(rotas)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
