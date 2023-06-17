import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { ajax } from "rxjs/ajax";
import { fromPromise } from "rxjs/internal/observable/fromPromise";
import { map, tap } from "rxjs/operators";
import * as StellarSdk from "stellar-sdk/dist/stellar-sdk.min.js";
// import { Server } from 'stellar-sdk';

declare const StellarSdk: any;

const currencyToAsset = {
    USD: "ICE",
};

const assetToCurrency = {
    ICE: "USD",
};

@Injectable({
    providedIn: "root",
})
export class StellarHistoryService {
    private server: any;

    constructor() {
        this.server = new StellarSdk.Server(environment.horizon);
        if (environment.testnet) {
            StellarSdk.Network.useTestNetwork();
        } else {
            StellarSdk.Network.usePublicNetwork();
        }
    }

    getRequest(url: string) {
        return ajax({
            url: url,
            crossDomain: true,
            createXHR: function () {
                return new XMLHttpRequest();
            },
        });
    }

    getAccountPaymentTransactions(account_id: string) {
        var url = environment.horizon + "/accounts/" + account_id + "/payments";
        return this.getRequest(url);
    }

    getSinglePaymentOperation(op_id: string) {
        return fromPromise(this.server.operations().operation(op_id).call());
    }

    getAccountPaymentOperationsRecent(account_id: string, limit: number) {
        return fromPromise(
            this.server
                .operations()
                .forAccount(account_id)
                .limit(limit)
                .order("desc")
                .call()
        ).pipe(
            map((res) => res["records"].filter((r) => r["type"] == "payment"))
        );
    }

    getAccountPaymentOperationsFull(account_id: string) {
        return fromPromise(
            this.server
                .operations()
                .forAccount(account_id)
                .order("desc")
                .limit(100)
                .call()
        ).pipe(
            map((res) => res["records"].filter((r) => r["type"] == "payment"))
        );
    }

    getAccount(account_id: string) {
        return fromPromise(this.server.accounts().accountId(account_id).call());
    }

    getEdexBalances(account_id: string) {
        console.log(account_id);
        return fromPromise(
            this.server.accounts().accountId(account_id).call()
        ).pipe(
            map((account) =>
                account["balances"].filter(
                    (r) =>
                        r["asset_issuer"] ==
                        "GBF46KAT3OIK74UK7S7SBTOA24BXA4YSAN5POU5HQC2H23EIBY7UL3FO"
                )
            ),
            map((balances) =>
                balances.map((b) => {
                    return { ...b, currency: assetToCurrency[b["asset_code"]] };
                })
            )
        );
    }

    // getTransactionFromHash(hash: string){
    //     return fromPromise(this.server.operations().)
    //     .pipe(
    //         map(res => res['records'].filter(r => r['type'] == 'payment'))
    //     )
    // }
}
