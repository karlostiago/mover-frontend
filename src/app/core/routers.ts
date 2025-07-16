import {CanActivate} from "./login/AuthGuard";
import {ForbiddenComponent} from "./components/forbidden/forbidden.component";
import {Routes} from "@angular/router";

export const routers: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        loadChildren: () => import('../pages/dashboard/dashboard.module').then(m => m.DashboardModule),
    },
    {
        path: 'clients',
        loadChildren: () => import('../pages/clients/client/client.module').then(m => m.ClientModule),
    },
    {
        path: 'contracts',
        loadChildren: () => import('../pages/clients/contract/contract.module').then(m => m.ContractModule),
    },
    {
        path: 'accounts',
        loadChildren: () => import('../pages/configuration/account/account.module').then(m => m.AccountModule),
    },
    {
        path: 'brands',
        loadChildren: () => import('../pages/configuration/brand/brand.module').then(m => m.BrandModule),
    },
    {
        path: 'cards',
        loadChildren: () => import('../pages/configuration/card/card.module').then(m => m.CardModule),
    },
    {
        path: 'categories',
        loadChildren: () => import('../pages/configuration/category/category.module').then(m => m.CategoryModule),
    },
    {
        path: 'parameters',
        loadChildren: () => import('../pages/configuration/parameter/parameter.module').then(m => m.ParameterModule),
    },
    {
        path: 'maintenance',
        loadChildren: () => import('../pages/fleets/maintenance/maintenance.module').then(m => m.MaintenanceModule),
    },
    {
        path: 'models',
        loadChildren: () => import('../pages/configuration/model/model.module').then(m => m.ModelModule),
    },
    {
        path: 'partners',
        loadChildren: () => import('../pages/configuration/partner/partner.module').then(m => m.PartnerModule),
    },
    {
        path: 'transactions',
        loadChildren: () => import('../pages/money/transaction/transaction.module').then(m => m.TransactionModule),
    },
    {
        path: 'invoices',
        loadChildren: () => import('../pages/money/invoice/invoice.module').then(m => m.InvoiceModule),
    },
    {
        path: 'vehicles',
        loadChildren: () => import('../pages/fleets/vehicle/vehicle.module').then(m => m.VehicleModule),
    },
    {
        path: 'users',
        loadChildren: () => import('../pages/security/user/user.module').then(m => m.UserModule),
    },
    {
        path: 'profiles',
        loadChildren: () => import('../pages/security/profile/profile.module').then(m => m.ProfileModule),
    },
    {
        path: 'permissions',
        loadChildren: () => import('../pages/security/permission/permission.module').then(m => m.PermissionModule),
    },
    {
        path: 'changepassword',
        loadChildren: () => import('../pages/security/change-password/change-password.module').then(m => m.ChangePasswordModule),
    },
    {
        path: 'fines',
        loadChildren: () => import('../pages/money/fine/fine.module').then(m => m.FineModule),
    },
    {
        path: 'forbidden',
        component: ForbiddenComponent,
        canActivate: [CanActivate]
    }
]
