import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ConsultaBrandComponent} from "./consulta-brand/consulta-brand.component";
import {CadastroBrandComponent} from "./cadastro-brand/cadastro-brand.component";

const rotas: Routes = [
    {
        path: 'consultar/marcas',
        component: ConsultaBrandComponent
    },
    {
        path: 'cadastro/marcas/novo',
        component: CadastroBrandComponent
    },
    {
        path: 'editar/marcas/:id',
        component: CadastroBrandComponent
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
export class BrandRoutingModule {

    constructor() { }
}
