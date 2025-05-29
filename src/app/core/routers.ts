import {DashboardComponent} from "../pages/dashboard/dashboard.component";
import {SearchClientComponent} from "../pages/clients/client/search-client/search-client.component";
import {RegisterClientComponent} from "../pages/clients/client/register-client/register-client.component";
import {SearchContractComponent} from "../pages/clients/contract/search-contract/search-contract.component";
import {RegisterContractComponent} from "../pages/clients/contract/register-contract/register-contract.component";
import {SearchAccountComponent} from "../pages/configuration/account/search-account/search-account.component";
import {RegisterAccountComponent} from "../pages/configuration/account/register-account/register-account.component";
import {SearchBrandComponent} from "../pages/configuration/brand/search-brand/search-brand.component";
import {RegisterBrandComponent} from "../pages/configuration/brand/register-brand/register-brand.component";
import {SearchCardComponent} from "../pages/configuration/card/search-card/search-card.component";
import {RegisterCardComponent} from "../pages/configuration/card/register-card/register-card.component";
import {SearchCategoryComponent} from "../pages/configuration/category/search-category/search-category.component";
import {RegisterCategoryComponent} from "../pages/configuration/category/register-category/register-category.component";
import {SearchParameterComponent} from "../pages/configuration/parameter/search-parameter/search-parameter.component";
import {
    RegisterParameterComponent
} from "../pages/configuration/parameter/register-parameter/register-parameter.component";
import {SearchMaintenanceComponent} from "../pages/fleets/maintenance/search-maintenance/search-maintenance.component";
import {RegisterMaintenanceComponent} from "../pages/fleets/maintenance/register-maintenance/register-maintenance.component";
import {SearchModelComponent} from "../pages/configuration/model/search-model/search-model.component";
import {RegisterModelComponent} from "../pages/configuration/model/register-model/register-model.component";
import {SearchPartnerComponent} from "../pages/configuration/partner/search-partner/search-partner.component";
import {RegisterPartnerComponent} from "../pages/configuration/partner/register-partner/register-partner.component";
import {SearchVehicleComponent} from "../pages/fleets/vehicle/search-vehicle/search-vehicle.component";
import {RegisterVehicleComponent} from "../pages/fleets/vehicle/register-vehicle/register-vehicle.component";
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
import {SearchTransactionComponent} from "../pages/money/transaction/search-transaction/search-transaction.component";
import {
    RegisterTransactionComponent
} from "../pages/money/transaction/register-transaction/register-transaction.component";
import {ForbiddenComponent} from "./components/forbidden/forbidden.component";
import {SearchInvoiceComponent} from "../pages/money/invoice/search-invoce/search-invoice.component";
import {Routes} from "@angular/router";

export const routers: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
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

    { path: 'parameters', component: SearchParameterComponent, canActivate: [CanActivate] },
    { path: 'parameters/new', component: RegisterParameterComponent, canActivate: [CanActivate] },
    { path: 'parameters/:id', component: RegisterParameterComponent, canActivate: [CanActivate] },

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
    { path: 'transactions/:type/new', component: RegisterTransactionComponent, canActivate: [CanActivate] },
    { path: 'transactions/:type/:id', component: RegisterTransactionComponent, canActivate: [CanActivate] },
    { path: 'transactions/:type/:id/clone', component: RegisterTransactionComponent, canActivate: [CanActivate] },

    { path: 'invoices/:id/credit-card/:cardId', component: SearchInvoiceComponent },

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

    { path: 'forbidden', component: ForbiddenComponent, canActivate: [CanActivate] },
]
