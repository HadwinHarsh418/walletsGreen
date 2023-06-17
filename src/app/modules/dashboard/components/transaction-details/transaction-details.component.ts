import { Component, OnInit } from "@angular/core";
import { environment } from "@environments/environment";
import { ActivatedRoute } from "@angular/router";
import * as loginReducers from "@modules/login/reducers";
import { select, Store } from "@ngrx/store";
import { StellarHistoryService } from "@root/services/stellar-history.service";
import { UserService } from "@root/services/user.service";
import { HttpService } from "@root/services/http.service";
import { combineLatest } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import * as transactionReducer from "@modules/transactions/reducers/index";
import { GetTransaction } from "@root/modules/transactions/actions/transactions.actions";

@Component({
    selector: "edex-transaction-details",
    templateUrl: "./transaction-details.component.html",
    styleUrls: ["./transaction-details.component.scss"],
})
export class TransactionDetailsComponent implements OnInit {
    public user$ = this.store.pipe(select(loginReducers.getUser));

    public accountId = "";
    public operations = [];
    public contacts = [];
    public poyntTransactions = [];
    public poyntMerchantDetails = [];
    public poyntUserDetails = [];
    public addressTo = "";
    public addressFrom = "";

    public txId: string = "";
    public asset: string = "";
    public amount: string = "";
    public date: string = "";
    public to: string = "";
    public from: string = "";

    constructor(
        private route: ActivatedRoute,
        private stellarHistory: StellarHistoryService,
        private store: Store<loginReducers.State>,
        private userService: UserService,
        private httpService: HttpService
    ) {}

    public transactionFees$ = this.store.pipe(
        select(transactionReducer.getTransactionFees)
    );
    transactionFees = {
        rolling_reserve_amount: 0,
        merchant_fee_receivable_amount: 0,
    };

    ngOnInit() {
        this.route.params.subscribe((params) => {
            // this.getTransactionDetails(params["id"]);
            this.txId = params["id"];
        });
        var url = environment.API_URL + "/api/transactions/poynt/" + this.txId;
        // this.http.post<any>(url, {}).subscribe((data) => {
        //     console.log(data);
        // });
        // console.log("In details", this.route.params);
        this.httpService.get(url, { id: this.txId }).subscribe((data) => {
            console.log("Single Transaction",data)
            this.poyntTransactions.push(data.data[0]);
            this.poyntMerchantDetails.push(data.merchant[0]);
            this.poyntUserDetails.push(data.user[0]);
            console.log("This is single transaction", this.poyntTransactions);
        });
        this.user$.subscribe((user) => {
            if (user["publicKey"]) {
                this.accountId = user["publicKey"];
                this.contacts = user["contacts"];
            }
        });

        this.transactionFees$.subscribe((u) => {
            this.transactionFees = u;
        });
    }

    // copy(val: string) {
    //     const selBox = document.createElement("textarea");
    //     selBox.style.position = "fixed";
    //     selBox.style.left = "0";
    //     selBox.style.top = "0";
    //     selBox.style.opacity = "0";

    //     selBox.value = val;
    //     selBox.value = val;

    //     document.body.appendChild(selBox);
    //     selBox.focus();
    //     selBox.select();
    //     document.execCommand("copy");
    //     document.body.removeChild(selBox);
    // }

    // getTransactionDetails(txId: string) {
    //     this.stellarHistory
    //         .getSinglePaymentOperation(txId)
    //         .pipe(
    //             map((res) => {
    //                 this.asset = res["asset_code"];
    //                 this.amount = res["amount"];
    //                 this.date = res["created_at"];
    //                 this.addressTo = res["to"];
    //                 this.addressFrom = res["from"];
    //                 this.store.dispatch(
    //                     new GetTransaction(res["transaction_hash"])
    //                 );
    //                 // const getToAux = this.contacts.find(i => i.address === this.to);
    //                 // const getFromAux = this.contacts.find(i => i.address === this.from);
    //                 // if (getToAux !== undefined) {
    //                 //     this.to = getToAux.name;
    //                 // }
    //                 // if (getFromAux !== undefined) {
    //                 //     this.from = getFromAux.name;
    //                 // }
    //                 return res;
    //             }),
    //             switchMap((res) =>
    //                 combineLatest(
    //                     this.userService.lookup(res["to"]),
    //                     this.userService.lookup(res["from"])
    //                 )
    //             )
    //         )
    //         .subscribe((res) => {
    //             this.to =
    //                 res[0]["firstname"] !== undefined
    //                     ? res[0]["firstname"] + " " + res[0]["lastname"]
    //                     : "EDEX";
    //             this.from =
    //                 res[1]["firstname"] !== undefined
    //                     ? res[1]["firstname"] + " " + res[1]["lastname"]
    //                     : "EDEX";
    //         });
    // }

    // getGrossAmount(fees, amount) {
    //     return (
    //         parseFloat(amount) +
    //         parseFloat(fees.rolling_reserve_amount) +
    //         parseFloat(fees.merchant_fee_receivable_amount)
    //     );
    //     //return amount + fees.rolling_reserve_amount + fees.merchant_fee_receivable_amount;
    // }
}
