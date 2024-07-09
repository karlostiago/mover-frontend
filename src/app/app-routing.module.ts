import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SearchBrandComponent} from "./pages/brand/search-brand/search-brand.component";

const rotas: Routes = [
    {
        path: '',
        component: SearchBrandComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(rotas)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
