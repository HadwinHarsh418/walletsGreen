import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MaterialModule } from '@modules/material/material.module';
import { PayrixTxnComponent } from './payrix-txn/payrix-txn.component';
import { RouterModule } from '@angular/router';
import { AllTxnComponent } from './all-txn/all-txn.component';
import { PortfolioComponent } from './portfolio/portfolio.component';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    PayrixTxnComponent,
    AllTxnComponent,
    PortfolioComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
  ],
  entryComponents: [
    ConfirmDialogComponent,
    PayrixTxnComponent,
    AllTxnComponent,
    PortfolioComponent
  ],
  exports: [
    ConfirmDialogComponent,
    PayrixTxnComponent,
    AllTxnComponent,
    PortfolioComponent
  ]
})
export class SharedModule { }
