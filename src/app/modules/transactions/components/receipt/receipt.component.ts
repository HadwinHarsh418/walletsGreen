import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '@root/modules/transactions/services/transactions.service';

@Component({
    selector: 'edex-receipt',
    templateUrl: './receipt.component.html',
    styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {

    public currency$ = this.transactionsService.currency;
    public amount$ = this.transactionsService.amount;

    public fee = '';
    public total = '';
    public subTotal = '';

    constructor(private transactionsService: TransactionsService) { }

    ngOnInit() {
        this.transactionsService.amount.subscribe(amount => {
            this.fee = ((Number(amount) / 100) * 2).toFixed(2);
            this.subTotal = Number(amount).toFixed(2);
            this.total = (Number(amount) + Number(this.fee)).toFixed(2);
        });
    }
}
