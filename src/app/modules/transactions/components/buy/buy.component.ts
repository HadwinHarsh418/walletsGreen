import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as txReducers from '@modules/transactions/reducers/index';
import { Store } from '@ngrx/store';
import { Buy } from '@root/modules/transactions/actions/transactions.actions';
import { TransactionsService } from '@root/modules/transactions/services/transactions.service';

@Component({
    selector: 'edex-buy',
    templateUrl: './buy.component.html',
    styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit {

    public formGroup: FormGroup;

    public currency_options = {
        align: 'left',
        allowNegative: false,
        prefix: ' ',
        thousands: ',',
        decimal: '.'
    };

    constructor(
        private fb: FormBuilder,
        private transactionsService: TransactionsService,
        private store: Store<txReducers.State>
    ) { }

    // 4024007108173153

    ngOnInit() {

        this.formGroup = this.fb.group({
            currency: ['USD', [Validators.required]],
            amount: ['', [Validators.required, Validators.min(20)]]
        });

        this.formGroup.valueChanges.subscribe(changes => {
            this.transactionsService.setAmount(Number(this.formGroup.get('amount').value).toFixed(2))
            this.transactionsService.setCurrency(this.formGroup.get('currency').value)
        });
    }

    getErrorAmount() {
        return this.formGroup.get('amount').hasError('min') ? 'Minimum purchase is 20.00' :
            this.formGroup.get('amount').hasError('required') ? 'Please enter an amount' : '';
    }

    getErrorCurrency() {
        return this.formGroup.get('currency').hasError('required') ? 'Please select a currency' : '';
    }

    buy() {
        if (this.formGroup.valid) {
            this.store.dispatch(new Buy(
                {
                    currency: this.formGroup.get('currency').value,
                    amount: Number(this.formGroup.get('amount').value).toFixed(2)
                }));
        }
    }
}
