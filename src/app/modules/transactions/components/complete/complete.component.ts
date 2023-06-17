import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StellarHistoryService } from '@root/services/stellar-history.service';
import * as loginReducers from '@modules/login/reducers';
import { Store, select } from "@ngrx/store";

@Component({
    selector: 'edex-complete',
    templateUrl: './complete.component.html',
    styleUrls: ['./complete.component.scss']
})
export class CompleteComponent implements OnInit {

    public user$ = this.store.pipe(select(loginReducers.getUser));

    public accountId = ''
    public operations = [];

    constructor(private route: ActivatedRoute,
        private stellarHistory: StellarHistoryService,
        private store: Store<loginReducers.State>
        ) { }


    ngOnInit() {
        this.route.params.subscribe(params => {
            console.log(params);
        });


            this.user$.subscribe(user => {
                if (user['publicKey']) {
                    this.accountId = user['publicKey']
                    this.getAccountOperations(this.accountId);
                }
            })

    }
    getAccountOperations(accountId: string) {
        this.stellarHistory.getAccountPaymentOperationsRecent(accountId, 4)
            .subscribe(res => {
                this.operations = res;
            },
            err => {
                console.error("Couldn't load transaction!");
            })
    }

}
