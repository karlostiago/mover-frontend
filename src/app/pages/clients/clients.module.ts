import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientModule} from "./client/client.module";
import {ContractModule} from "./contract/contract.module";

@NgModule({
    declarations: [

    ],
    exports: [

    ],
    imports: [
        CommonModule,
        ClientModule,
        ContractModule
    ]
})
export class ClientsModule { }
