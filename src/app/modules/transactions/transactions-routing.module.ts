import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from '@modules/transactions/components/container/container.component';
import { CompleteComponent } from './components/complete/complete.component';
import { FullTransactionHistoryComponent } from '../dashboard/components/full-transaction-history/full-transaction-history.component';
import { AuthGuardService } from '@root/services/auth-guard.service';
const routes: Routes = [
    {
        path: 'buy-and-sell',
        component: ContainerComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'buy-and-sell/complete',
        component: CompleteComponent,
        canActivate: [AuthGuardService]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TransactionsRoutingModule { }
