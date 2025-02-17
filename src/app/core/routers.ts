import {DashboardComponent} from "../pages/dashboard/dashboard.component";
import {SearchClientComponent} from "../pages/client/search-client/search-client.component";
import {RegisterClientComponent} from "../pages/client/register-client/register-client.component";
import {SearchContractComponent} from "../pages/contract/search-contract/search-contract.component";
import {RegisterContractComponent} from "../pages/contract/register-contract/register-contract.component";
import {SearchAccountComponent} from "../pages/account/search-account/search-account.component";
import {RegisterAccountComponent} from "../pages/account/register-account/register-account.component";
import {SearchBrandComponent} from "../pages/brand/search-brand/search-brand.component";
import {RegisterBrandComponent} from "../pages/brand/register-brand/register-brand.component";
import {SearchCardComponent} from "../pages/card/search-card/search-card.component";
import {RegisterCardComponent} from "../pages/card/register-card/register-card.component";
import {SearchCategoryComponent} from "../pages/category/search-category/search-category.component";
import {RegisterCategoryComponent} from "../pages/category/register-category/register-category.component";
import {SearchConfigurationComponent} from "../pages/configuration/search-configuration/search-configuration.component";
import {
    RegisterConfigurationComponent
} from "../pages/configuration/register-configuration/register-configuration.component";
import {SearchMaintenanceComponent} from "../pages/maintenance/search-maintenance/search-maintenance.component";
import {RegisterMaintenanceComponent} from "../pages/maintenance/register-maintenance/register-maintenance.component";
import {SearchModelComponent} from "../pages/model/search-model/search-model.component";
import {RegisterModelComponent} from "../pages/model/register-model/register-model.component";
import {SearchPartnerComponent} from "../pages/partner/search-partner/search-partner.component";
import {RegisterPartnerComponent} from "../pages/partner/register-partner/register-partner.component";
import {SearchTransactionComponent} from "../pages/transaction/search-transaction/search-transaction.component";
import {RegisterTransactionComponent} from "../pages/transaction/register-transaction/register-transaction.component";
import {SearchVehicleComponent} from "../pages/vehicle/search-vehicle/search-vehicle.component";
import {RegisterVehicleComponent} from "../pages/vehicle/register-vehicle/register-vehicle.component";
import {SearchUserComponent} from "../pages/security/user/search-user/search-user.component";
import {RegisterUserComponent} from "../pages/security/user/register-user/register-user.component";
import {SearchProfileComponent} from "../pages/security/profile/search-profile/search-profile.component";
import {RegisterProfileComponent} from "../pages/security/profile/register-profile/register-profile.component";
import {SearchPermissionComponent} from "../pages/security/permission/search-permission/search-permission.component";
import {
    RegisterPermissionComponent
} from "../pages/security/permission/register-permission/register-permission.component";
import {CanActivate} from "./login/AuthGuard";
import {
    SearchChangePasswordComponent
} from "../pages/security/change-password/search-change-password/search-change-password.component";
import {
    RegisterChangePasswordComponent
} from "../pages/security/change-password/register-change-password/register-change-password.component";

export const routers = [
    { path: '', component: DashboardComponent, canActivate: [CanActivate] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [CanActivate] },

    { path: 'clients', component: SearchClientComponent, canActivate: [CanActivate] },
    { path: 'clients/new', component: RegisterClientComponent, canActivate: [CanActivate] },
    { path: 'clients/:id', component: RegisterClientComponent, canActivate: [CanActivate] },

    { path: 'contracts', component: SearchContractComponent, canActivate: [CanActivate] },
    { path: 'contracts/new', component: RegisterContractComponent, canActivate: [CanActivate] },
    { path: 'contracts/:id', component: RegisterContractComponent, canActivate: [CanActivate] },

    { path: 'accounts', component: SearchAccountComponent, canActivate: [CanActivate] },
    { path: 'accounts/new', component: RegisterAccountComponent, canActivate: [CanActivate] },
    { path: 'accounts/:id', component: RegisterAccountComponent, canActivate: [CanActivate] },

    { path: 'brands', component: SearchBrandComponent, canActivate: [CanActivate] },
    { path: 'brands/new', component: RegisterBrandComponent, canActivate: [CanActivate] },
    { path: 'brands/:id', component: RegisterBrandComponent, canActivate: [CanActivate] },

    { path: 'cards', component: SearchCardComponent, canActivate: [CanActivate] },
    { path: 'cards/new', component: RegisterCardComponent, canActivate: [CanActivate] },
    { path: 'cards/:id', component: RegisterCardComponent, canActivate: [CanActivate] },

    { path: 'categories', component: SearchCategoryComponent, canActivate: [CanActivate] },
    { path: 'categories/new', component: RegisterCategoryComponent, canActivate: [CanActivate] },
    { path: 'categories/:id', component: RegisterCategoryComponent, canActivate: [CanActivate] },

    { path: 'parameters', component: SearchConfigurationComponent, canActivate: [CanActivate] },
    { path: 'parameters/new', component: RegisterConfigurationComponent, canActivate: [CanActivate] },
    { path: 'parameters/:id', component: RegisterConfigurationComponent, canActivate: [CanActivate] },

    { path: 'maintenance', component: SearchMaintenanceComponent, canActivate: [CanActivate] },
    { path: 'maintenance/new', component: RegisterMaintenanceComponent, canActivate: [CanActivate] },
    { path: 'maintenance/:id', component: RegisterMaintenanceComponent, canActivate: [CanActivate]},

    { path: 'models', component: SearchModelComponent, canActivate: [CanActivate] },
    { path: 'models/new', component: RegisterModelComponent, canActivate: [CanActivate] },
    { path: 'models/:id', component: RegisterModelComponent, canActivate: [CanActivate] },

    { path: 'partners', component: SearchPartnerComponent, canActivate: [CanActivate] },
    { path: 'partners/new', component: RegisterPartnerComponent, canActivate: [CanActivate] },
    { path: 'partners/:id', component: RegisterPartnerComponent, canActivate: [CanActivate] },

    { path: 'transactions', component: SearchTransactionComponent, canActivate: [CanActivate] },
    { path: 'transactions/new', component: RegisterTransactionComponent, canActivate: [CanActivate] },
    { path: 'transactions/:id', component: RegisterTransactionComponent, canActivate: [CanActivate] },

    { path: 'vehicles', component: SearchVehicleComponent, canActivate: [CanActivate] },
    { path: 'vehicles/new', component: RegisterVehicleComponent, canActivate: [CanActivate] },
    { path: 'vehicles/:id', component: RegisterVehicleComponent, canActivate: [CanActivate] },

    { path: 'users', component: SearchUserComponent, canActivate: [CanActivate] },
    { path: 'users/new', component: RegisterUserComponent, canActivate: [CanActivate] },
    { path: 'users/:id', component: RegisterUserComponent, canActivate: [CanActivate] },

    { path: 'profiles', component: SearchProfileComponent, canActivate: [CanActivate] },
    { path: 'profiles/new', component: RegisterProfileComponent, canActivate: [CanActivate] },
    { path: 'profiles/:id', component: RegisterProfileComponent, canActivate: [CanActivate] },

    { path: 'permissions', component: SearchPermissionComponent, canActivate: [CanActivate] },
    { path: 'permissions/new', component: RegisterPermissionComponent, canActivate: [CanActivate] },
    { path: 'permissions/:id', component: RegisterPermissionComponent, canActivate: [CanActivate] },

    { path: 'changepassword', component: SearchChangePasswordComponent, canActivate: [CanActivate] },
    { path: 'changepassword/:id', component: RegisterChangePasswordComponent, canActivate: [CanActivate] },
]
