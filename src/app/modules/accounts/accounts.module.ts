import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "@root/modules/material/material.module";
import { AccountsRoutingModule } from "./accounts-routing.module";
import { AccountComponent } from "./components/account/account.component";
import { ContainerComponent } from "./components/container.component";
import { SendDialogueComponent } from "./components/send-dialogue/send-dialogue.component";
import { ReceiveDialogueComponent } from "./components/receive-dialogue/receive-dialogue.component";
import { QRCodeModule } from 'angularx-qrcode';
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { SendPaymentEffects } from "@root/modules/accounts/effects/send-payment.effects";
import { reducers } from '@modules/accounts/reducers';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxCurrencyModule } from "ngx-currency";
import { ExchangeDialogueComponent } from './components/exchange-dialogue/exchange-dialogue.component';
import { ExchangeCurrencyEffects } from "./effects/exchange-currency.effects";


@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        QRCodeModule,
        FormsModule,
        ReactiveFormsModule,
        NgxCurrencyModule,
        StoreModule.forFeature("accounts", reducers),
        EffectsModule.forFeature([SendPaymentEffects, ExchangeCurrencyEffects]),
        AccountsRoutingModule
    ],
    declarations: [
        ContainerComponent,
        AccountComponent,
        SendDialogueComponent,
        ReceiveDialogueComponent,
        ExchangeDialogueComponent
    ],
    entryComponents:[
        SendDialogueComponent,
        ReceiveDialogueComponent,
        ExchangeDialogueComponent
    ]
})
export class AccountsModule {}
