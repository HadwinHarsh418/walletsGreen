import { Component, OnInit, Input } from "@angular/core";
import { MatDialog } from "@angular/material";
import { SendDialogueComponent } from "@root/modules/accounts/components/send-dialogue/send-dialogue.component";
import { ReceiveDialogueComponent } from "@root/modules/accounts/components/receive-dialogue/receive-dialogue.component";
import { ExchangeDialogueComponent } from "@root/modules/accounts/components/exchange-dialogue/exchange-dialogue.component";
import { Store, select } from "@ngrx/store";
import * as loginReducers from '@modules/login/reducers'
import * as accountsReducers from '@modules/accounts/reducers'
import { ResetSendPayment } from '@modules/accounts/actions/send-payment.actions'
import { take } from "rxjs/operators";
import { ResetExchangeCurrency } from "../../actions/exchange-currency.actions";


@Component({
    selector: "acc-account",
    templateUrl: "./account.component.html",
    styleUrls: ["./account.component.scss"]
})
export class AccountComponent implements OnInit {

    @Input() account;

    public user$ = this.store.pipe(select(loginReducers.getUser));

    constructor(
        public dialog: MatDialog,
        private store: Store<loginReducers.State>,
        private acc_store: Store<accountsReducers.State>
    ) { }

    ngOnInit() { }

    send() {
        const dialogRef = this.dialog.open(SendDialogueComponent, {
            data: { account: this.account },
        });

        dialogRef.afterClosed().subscribe(result => {

            this.acc_store.dispatch(new ResetSendPayment());

        });
    }

    receive() {
        this.user$.pipe(take(1)).subscribe(user => {
            const dialogRef = this.dialog.open(ReceiveDialogueComponent, {
                data: { account: this.account, user: user },
            });
        })
    }

    exchange() {
        const dialogRef = this.dialog.open(ExchangeDialogueComponent, {
            data: { account: this.account },
            // width: '280px'
        });

        dialogRef.afterClosed().subscribe(result => {

            this.acc_store.dispatch(new ResetExchangeCurrency());

        });
    }

}
