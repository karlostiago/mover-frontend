import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PickProfilesComponent} from "./pick-profiles.component";
import {ButtonDirective} from "primeng/button";

@NgModule({
    declarations: [
        PickProfilesComponent
    ],
    exports: [
        PickProfilesComponent
    ],
    imports: [
        CommonModule,
        ButtonDirective,
    ]
})
export class PickProfilesModule { }
