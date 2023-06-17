import { Component, OnInit } from "@angular/core";
import { environment } from "@environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { StellarHistoryService } from "@root/services/stellar-history.service";
import { HttpService } from "@root/services/http.service";
import * as loginReducers from "@modules/login/reducers";
import { Store, select } from "@ngrx/store";

@Component({
    selector: "edex-recent-transactions",
    templateUrl: "./recent-transactions.component.html",
    styleUrls: ["./recent-transactions.component.scss"],
})
export class RecentTransactionsComponent implements OnInit {
    public user$ = this.store.pipe(select(loginReducers.getUser));

    public accountId = "";
    public operations = [];
    public poyntTransactions = [];

    constructor(
        private stellarHistory: StellarHistoryService,
        private store: Store<loginReducers.State>,
        private httpService: HttpService
    ) {}

    ngOnInit() {
        this.user$.subscribe((user) => {
            if (user["publicKey"]) {
                this.accountId = user["publicKey"];
                this.getAccountOperations(this.accountId);
            }
        });
        var url = environment.API_URL + "/api/transactions/poynt";
        // this.http.post<any>(url, {}).subscribe((data) => {
        //     console.log(data);
        // });
        this.httpService.post(url, {}).subscribe((data) => {
            this.poyntTransactions = data.data;
            console.log(this.poyntTransactions);
        });
    }

    getAccountOperations(accountId: string) {
        this.stellarHistory
            .getAccountPaymentOperationsRecent(accountId, 4)
            .subscribe(
                (res) => {
                    this.operations = res;
                },
                (err) => {
                    console.error("Couldn't load transaction!");
                }
            );
    }
}
