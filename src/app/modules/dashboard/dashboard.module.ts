import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { ContainerComponent } from "./components/container/container.component";
import { ChartsComponent } from "./components/charts/charts.component";
import { PortfolioComponent } from "./components/portfolio/portfolio.component";
import { RecentTransactionsComponent } from "./components/recent-transactions/recent-transactions.component";
import { TransactionDetailsComponent } from "./components/transaction-details/transaction-details.component";
import { MaterialModule } from "@root/modules/material/material.module";
import { FullTransactionHistoryComponent } from "./components/full-transaction-history/full-transaction-history.component";
import { TransactionsComponent } from '@modules/super-admin/components/dashboard/transactions/transactions.component';
import { SharedModule } from "../shared/shared.module";
import { BarchartsComponent } from './components/barcharts/barcharts.component';

@NgModule({
  imports: [CommonModule, MaterialModule, DashboardRoutingModule, SharedModule],
  declarations: [
    ContainerComponent,
    ChartsComponent,
    PortfolioComponent,
    RecentTransactionsComponent,
    TransactionDetailsComponent,
    TransactionsComponent,
    FullTransactionHistoryComponent,
    BarchartsComponent
  ]
})
export class DashboardModule {}
