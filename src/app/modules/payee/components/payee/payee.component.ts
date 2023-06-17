import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material";
import * as loginReducers from '@modules/login/reducers';
import { ResetSendPayment } from '@modules/payee/actions/send-payment.actions';
import * as payeeReducers from '@modules/payee/reducers';
import { select, Store } from "@ngrx/store";
import { ReceiveDialogueComponent } from "@root/modules/payee/components/receive-dialogue/receive-dialogue.component";
import { SendDialogueComponent } from "@root/modules/payee/components/send-dialogue/send-dialogue.component";
import { take } from "rxjs/operators";


@Component({
    selector: "acc-payee",
    templateUrl: "./payee.component.html",
    styleUrls: ["./payee.component.scss"]
})
export class PayeeComponent implements OnInit {

    @Input() payee;
    @Input() accounts;
    @Output() selectedPayee = new EventEmitter();

    public user$ = this.store.pipe(select(loginReducers.getUser));

    constructor(
        public dialog: MatDialog,
        private store: Store<loginReducers.State>,
        private acc_store: Store<payeeReducers.State>
    ) { }

    ngOnInit() { 
        console.log(this.payee);
    }


    send() {
        const dialogRef = this.dialog.open(SendDialogueComponent, {
            data: {
                payee: this.payee,
                accounts: this.accounts
            },
        });

        dialogRef.afterClosed().subscribe(result => {
            this.acc_store.dispatch(new ResetSendPayment());
        });
    }

    maskAddress(address: string) {
        //return address.replace(/.(?=.{8,}$)/g, '*');
        return "********" + address.slice(-8);
    }

    receive() {
        this.user$.pipe(take(1)).subscribe(user => {

            const dialogRef = this.dialog.open(ReceiveDialogueComponent, {
                data: { account: this.payee, user: user },
            });

        })
    }

}
