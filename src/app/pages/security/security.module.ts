import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserModule} from "./user/user.module";
import {PermissionModule} from "./permission/permission.module";
import {ProfileModule} from "./profile/profile.module";
import {ChangePasswordModule} from "./change-password/change-password.module";

@NgModule({
    declarations: [

    ],
    exports: [

    ],
    imports: [
        CommonModule,
        UserModule,
        PermissionModule,
        ProfileModule,
        ChangePasswordModule
    ]
})
export class SecurityModule { }
