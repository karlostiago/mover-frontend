import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountModule} from "./account/account.module";
import {CardModule} from "./card/card.module";
import {CategoryModule} from "./category/category.module";
import {ModelModule} from "./model/model.module";
import {PartnerModule} from "./partner/partner.module";
import {ParameterModule} from "./parameter/parameter.module";
import {BrandModule} from "./brand/brand.module";

@NgModule({
    declarations: [

    ],
    exports: [

    ],
    imports: [
        CommonModule,
        AccountModule,
        CardModule,
        CategoryModule,
        ModelModule,
        BrandModule,
        PartnerModule,
        ParameterModule
    ]
})
export class ConfigurationModule { }
