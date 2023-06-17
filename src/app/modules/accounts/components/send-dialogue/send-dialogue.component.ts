import { Component, OnInit, Inject, Input} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import * as accountsReducers from '@modules/accounts/reducers';
import { Store, select } from '@ngrx/store';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SendPayment } from '@root/modules/accounts/actions/send-payment.actions';
import { Payee } from "@root/interfaces/payee.interface";
import * as loginReducers from "@modules/login/reducers";
import { Observable, Subject } from "rxjs";
import { filter, map } from "rxjs/operators";
import { EdexValidators } from "@root/utils/edex-validators";


@Component({
    selector: 'edex-send-dialogue',
    templateUrl: './send-dialogue.component.html',
    styleUrls: ['./send-dialogue.component.scss']
})
export class SendDialogueComponent implements OnInit {

    
      public success$ = this.store.pipe(select(accountsReducers.getSendPaymentSuccess));
    public pending$ = this.store.pipe(select(accountsReducers.getSendPaymentPending));
    public error$ = this.store.pipe(select(accountsReducers.getSendPaymentError));

    public sendForm: FormGroup;

    private user$ = this.store.pipe(select(loginReducers.getUser));
    public contacts$: Observable<any> = null;
    public selectedPayee$: Subject<Payee> = new Subject();

    public to_accountConfirm = new FormControl('', [], [EdexValidators.notUsersPublicKey(this.user$)]);

    public currency_options = {
        align: "left",
        allowNegative: false,
        prefix: ' ',
        thousands: ',',
        decimal: '.'
    }
    SendPaymentInterface: any;

    constructor(
        private fb: FormBuilder,
        private store: Store<accountsReducers.State>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<SendDialogueComponent>
    ) { }


    ngOnInit() {
        this.contacts$ = this.user$.pipe(
            filter(user => user != null),
            map(user => user.contacts)
        )
        this.sendForm = this.fb.group({
            to_account: this.to_accountConfirm,
            amount: ['', [Validators.required]],
            asset: this.data.account['asset_code']
        })
    }

    selectedPayee(payee: Payee) {
        this.sendForm.controls["to_account"].setValue(payee.address)
        return this.selectedPayee$.next(payee)
    }

    send() {
        if (this.sendForm.valid) {
            this.store.dispatch(new SendPayment(this.sendForm.value))
        }
    }

    cancel() {
        this.dialogRef.close()
    }

}
