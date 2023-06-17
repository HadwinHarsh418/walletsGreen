import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from '@root/modules/super-admin/components/container/admin.component';
import { MerchantInfoComponent } from '@modules/super-admin/components/merchant-info/merchant-info.component';
import { DashboardComponent } from '@modules/super-admin/components/dashboard/dashboard.component';
import { MerchantsComponent } from '@modules/super-admin/components/merchants/merchants.component';
import { AdminsComponent } from '@modules/super-admin/components/admins/admins.component';
import { AdminGuardService } from '@services/admin-guard.service';
import { TransactionsComponent } from '@modules/super-admin/components/transactions/transactions.component';
import { TransactionDetailsComponent } from '@modules/dashboard/components/transaction-details/transaction-details.component';
import { FullTransactionHistoryComponent } from '@modules/dashboard/components/full-transaction-history/full-transaction-history.component';
import { DeactivateMerchantComponent } from './components/deactivate-merchant/deactivate-merchant.component';
import { AdminContainerComponent } from './components/admin-container/admin-container.component';
const routes: Routes = [
  {
    path: 'admin/dashboard',
    component: DashboardComponent,
    canActivate: [AdminGuardService],
  },
  {
    path: 'admin/admins',
    component: AdminContainerComponent,
    canActivate: [AdminGuardService],
  },
  {
    path: 'admin/users',
    component: ContainerComponent,
    canActivate: [AdminGuardService],
    children: [
      {
        path: 'merchants',
        pathMatch: 'full',
        component: MerchantsComponent
      },
      {
        path: 'deactivateMerchants',
        pathMatch: 'full',
        component: DeactivateMerchantComponent
      },
      {
        path: 'admins',
        pathMatch: 'full',
        component: AdminsComponent
      }
    ]
  },
  {
    path: 'admin/users/merchants/:id',
    component: MerchantInfoComponent,
    canActivate: [AdminGuardService]
  },
    {
        path: 'admin/merchants/transactions/:id',
        component: TransactionsComponent,
        canActivate: [AdminGuardService]
    },
    {
        path: 'admin/transactions/:id',
        component: TransactionDetailsComponent,
        canActivate: [AdminGuardService]
    },
    {
        path: 'admin/full-transaction-history/:accountId',
        component: FullTransactionHistoryComponent,
        canActivate: [AdminGuardService]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
