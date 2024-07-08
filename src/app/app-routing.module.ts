import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConsultaBrandComponent} from "./pages/brand/consulta-brand/consulta-brand.component";

const rotas: Routes = [
    {
        path: '',
        component: ConsultaBrandComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(rotas)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
