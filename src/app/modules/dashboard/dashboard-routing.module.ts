import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from '@root/modules/dashboard/components/container/container.component';
import { TransactionDetailsComponent } from '@root/modules/dashboard/components/transaction-details/transaction-details.component';
import { FullTransactionHistoryComponent } from '@root/modules/dashboard/components/full-transaction-history/full-transaction-history.component';
import { AuthGuardService } from '@root/services/auth-guard.service';

const routes: Routes = [
  {
    path: 'dashboard',
    component: ContainerComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'transaction-details/:id',
    component: TransactionDetailsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'full-transaction-history/:accountId',
    component: FullTransactionHistoryComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
