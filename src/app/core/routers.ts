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

export const routers = [
    { path: '', component: DashboardComponent },
    { path: 'dashboard', component: DashboardComponent },

    { path: 'clients', component: SearchClientComponent },
    { path: 'clients/new', component: RegisterClientComponent },
    { path: 'clients/:id', component: RegisterClientComponent },

    { path: 'contracts', component: SearchContractComponent },
    { path: 'contracts/new', component: RegisterContractComponent },
    { path: 'contracts/:id', component: RegisterContractComponent },

    { path: 'accounts', component: SearchAccountComponent },
    { path: 'accounts/new', component: RegisterAccountComponent },
    { path: 'accounts/:id', component: RegisterAccountComponent },

    { path: 'brands', component: SearchBrandComponent },
    { path: 'brands/new', component: RegisterBrandComponent },
    { path: 'brands/:id', component: RegisterBrandComponent },

    { path: 'cards', component: SearchCardComponent },
    { path: 'cards/new', component: RegisterCardComponent },
    { path: 'cards/:id', component: RegisterCardComponent },

    { path: 'categories', component: SearchCategoryComponent },
    { path: 'categories/new', component: RegisterCategoryComponent },
    { path: 'categories/:id', component: RegisterCategoryComponent },

    { path: 'parameters', component: SearchConfigurationComponent },
    { path: 'parameters/new', component: RegisterConfigurationComponent },
    { path: 'parameters/:id', component: RegisterConfigurationComponent },

    { path: 'maintenance', component: SearchMaintenanceComponent },
    { path: 'maintenance/new', component: RegisterMaintenanceComponent },
    { path: 'maintenance/:id', component: RegisterMaintenanceComponent },

    { path: 'models', component: SearchModelComponent },
    { path: 'models/new', component: RegisterModelComponent },
    { path: 'models/:id', component: RegisterModelComponent },

    { path: 'partners', component: SearchPartnerComponent },
    { path: 'partners/new', component: RegisterPartnerComponent },
    { path: 'partners/:id', component: RegisterPartnerComponent },

    { path: 'transactions', component: SearchTransactionComponent },
    { path: 'transactions/new', component: RegisterTransactionComponent },
    { path: 'transactions/:id', component: RegisterTransactionComponent },

    { path: 'vehicles', component: SearchVehicleComponent },
    { path: 'vehicles/new', component: RegisterVehicleComponent },
    { path: 'vehicles/:id', component: RegisterVehicleComponent },

    { path: 'users', component: SearchUserComponent },
    { path: 'users/new', component: RegisterUserComponent },
    { path: 'users/:id', component: RegisterUserComponent },

    { path: 'profiles', component: SearchProfileComponent },
    { path: 'profiles/new', component: RegisterProfileComponent },
    { path: 'profiles/:id', component: RegisterProfileComponent },

    { path: 'permissions', component: SearchPermissionComponent },
    { path: 'permissions/new', component: RegisterPermissionComponent },
    { path: 'permissions/:id', component: RegisterPermissionComponent },
]
