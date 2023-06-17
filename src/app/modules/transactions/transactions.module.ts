import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TransactionsRoutingModule } from "./transactions-routing.module";
import { ContainerComponent } from "./components/container/container.component";
import { BuyComponent } from "./components/buy/buy.component";
import { SellComponent } from "./components/sell/sell.component";
import { ReceiptComponent } from "./components/receipt/receipt.component";
import { MaterialModule } from "@root/modules/material/material.module";
import { TransactionRowComponent } from "./components/receipt/transaction-row/transaction-row.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxCurrencyModule } from "ngx-currency";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { reducers } from "@modules/transactions/reducers";
import { TransactionsEffects } from "@root/modules/transactions/effects/transactions.effects";
import { CompleteComponent } from './components/complete/complete.component';
// import { OrderComponent } from "./components/order/order.component";
// import { OrdersComponent } from "./components/orders/orders.component";
// import { OrdersComponent } from "./components/orders/orders.component";
// import { OrderComponent } from "./components/order/order.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxCurrencyModule,
        MaterialModule,
        StoreModule.forFeature("transactions", reducers),
        EffectsModule.forFeature([TransactionsEffects]),
        TransactionsRoutingModule
    ],
    declarations: [
        ContainerComponent,
        BuyComponent,
        SellComponent,
        ReceiptComponent,
        TransactionRowComponent,
        CompleteComponent,
        // OrderComponent,
        // OrdersComponent
    ]
})
export class TransactionsModule {}
