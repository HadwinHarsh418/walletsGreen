import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import * as accountsReducers from '@modules/accounts/reducers';
import { Store, select } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExchangeCurrency } from '@root/modules/accounts/actions/exchange-currency.actions';


const STATIC_RATES = {
    // ICE: {
    //     ECPS: 0.86,
    //     ECPU: 1.11
    // },
    // ECPS: {
    //     ECPE: 1.16,
    //     ECPU: 1.32
    // },
    // ECPU: {
    //     ECPE: 0.85,
    //     ECPS: 0.76
    // }
};

export interface NewAsset {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'edex-exchange-dialogue',
    templateUrl: './exchange-dialogue.component.html',
    styleUrls: ['./exchange-dialogue.component.scss']
})
export class ExchangeDialogueComponent implements OnInit {

    public newAssets: Array<NewAsset> = [
        { value: 'ICE', viewValue: 'ICE' },
    ];

    public currency_options = {
        align: 'left',
        allowNegative: false,
        prefix: ' ',
        thousands: ',',
        decimal: '.'
    };

    public success$ = this.store.pipe(select(accountsReducers.getExchangeCurrencySuccess));
    public pending$ = this.store.pipe(select(accountsReducers.getExchangeCurrencyPending));
    public error$ = this.store.pipe(select(accountsReducers.getExchangeCurrencyError));

    public exchangeForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private store: Store<accountsReducers.State>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<ExchangeDialogueComponent>
    ) { }

    ngOnInit() {
        this.exchangeForm = this.fb.group({
            amount: [0.0, [Validators.required, Validators.min(0.1)]],
            initial_asset: this.data.account['asset_code'],
            new_asset: '',
            user_publicKey: ''
        });
    }

    exchange() {
        if (this.exchangeForm.valid) {
            this.store.dispatch(new ExchangeCurrency(this.exchangeForm.value))
        }
    }

    calcRate() {
        return this.exchangeForm.get('new_asset').value + ': ' + (
            STATIC_RATES[this.data.account.asset_code][this.exchangeForm.get('new_asset').value] *
            this.exchangeForm.get('amount').value
        ).toFixed(2);
    }

    cancel() {
        this.dialogRef.close();
    }

}
