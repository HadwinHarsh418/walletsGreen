import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as payeeReducers from '@modules/payee/reducers';
import { select, Store } from '@ngrx/store';
import { SendPayment } from '@root/modules/payee/actions/send-payment.actions';

export interface Assets {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'edex-send-dialogue',
    templateUrl: './send-dialogue.component.html',
    styleUrls: ['./send-dialogue.component.scss']
})
export class SendDialogueComponent implements OnInit {

    assets: Assets[] = [
        { value: 'ICE', viewValue: 'USD' },
        // { value: 'ECPS', viewValue: 'GBP' },
        // { value: 'ECPU', viewValue: 'USD' }
    ];

    public success$ = this.store.pipe(select(payeeReducers.getSendPaymentSuccess));
    public pending$ = this.store.pipe(select(payeeReducers.getSendPaymentPending));
    public error$ = this.store.pipe(select(payeeReducers.getSendPaymentError));

    public sendForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private store: Store<payeeReducers.State>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<SendDialogueComponent>
    ) { }


    ngOnInit() {
        this.sendForm = this.fb.group({
            to_account: this.data.payee.address,
            amount: ['', [Validators.required]],
            asset: ['', [Validators.required]]
        })
    }

    send() {
        if (this.sendForm.valid) {
            this.store.dispatch(new SendPayment(this.sendForm.value))
        }
    }

    cancel() {
        this.dialogRef.close()
    }

    maskAccount(to_account: string) {
        return "********" + to_account.slice(-8);
    }

}
