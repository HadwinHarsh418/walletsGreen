import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "@root/modules/material/material.module";
import { PayeeRoutingModule } from "./payee-routing.module";
import { PayeeComponent } from "./components/payee/payee.component";
import { ContainerComponent } from "./components/container.component";
import { SendDialogueComponent } from "./components/send-dialogue/send-dialogue.component";
import { ReceiveDialogueComponent } from "./components/receive-dialogue/receive-dialogue.component";
import { QRCodeModule } from "angularx-qrcode";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { SendPaymentEffects } from "@root/modules/payee/effects/send-payment.effects";
import { reducers } from "@modules/payee/reducers";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DashboardModule } from "../../modules/dashboard/dashboard.module";
import { NewPayeeDialogueComponent } from './components/new-payee-dialogue/new-payee-dialogue.component';
import { NewPayeeEffects } from "./effects/new-payee.effects";

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        QRCodeModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forFeature("payee", reducers),
        EffectsModule.forFeature([SendPaymentEffects, NewPayeeEffects]),
        PayeeRoutingModule,
        DashboardModule
    ],
    declarations: [
        ContainerComponent,
        PayeeComponent,
        SendDialogueComponent,
        ReceiveDialogueComponent,
        NewPayeeDialogueComponent
    ],
    entryComponents: [
        SendDialogueComponent,
        NewPayeeDialogueComponent
    ]
})
export class PayeeModule {}
