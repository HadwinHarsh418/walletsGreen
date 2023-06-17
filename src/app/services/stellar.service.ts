import { Injectable } from '@angular/core';
import { fromPromise } from 'rxjs/internal/observable/fromPromise';
import * as StellarSdk from 'stellar-sdk/dist/stellar-sdk.min.js';
import { environment } from '@environments/environment';

declare const StellarSdk: any;

const ASSETS = {
    'XPORT': new StellarSdk.Asset('XPORT', 'GCC4HAL7SOR7AZBF53SUTVAJT4OHYLBHOUJMM3IAF5YLFF7OVVAWLVFT'),
    'USDT': new StellarSdk.Asset('USDT', 'GCQTGZQQ5G4PTM2GL7CDIFKUBIPEC52BROAQIAPW53XBRJVN6ZJVTG6V'),
    'MOBI' : new StellarSdk.Asset('MOBI', 'GA6HCMBLTZS5VYYBCATRBRZ3BZJMAFUDKYYF6AH6MVCMGWMRDNSWJPIH'),
    'XLM': StellarSdk.Asset.native()
}

const getAsset = (asset) => {
    if (ASSETS[asset]) return ASSETS[asset]
    return StellarSdk.Asset.native()
}


// @Injectable({
// //   providedIn: 'root'
// })
export class StellarService {

    private server: any;

    constructor() {
        // this.server = new StellarSdk.Server('https://horizon.stellar.org');
        // StellarSdk.Network.usePublicNetwork();
        this.server = new StellarSdk.Server(environment.horizon);
        if (environment.testnet){
            StellarSdk.Network.useTestNetwork();
        } else {
            StellarSdk.Network.usePublicNetwork();
        }
    }


    payment(seed, destination, asset, amount) {
        let that = this;
        let kp = StellarSdk.Keypair.fromSecret(seed)
        return fromPromise(
            this.server.loadAccount(kp.publicKey())
            .then(
                account => {

                    let builder = new StellarSdk.TransactionBuilder(account);

                    builder.addOperation(
                        StellarSdk.Operation.payment({
                            destination: destination,
                            asset: getAsset(asset),
                            amount: amount
                        })
                    )

                    let transaction = builder.build();

                    transaction.sign(kp);

                    return that.server.submitTransaction(transaction);
                },
                err => { throw err }
            )
            .catch(err => { console.log(err); throw err; })
        );
    }


    getPublicKeyFromSeed(seed){
        return StellarSdk.Keypair.fromSecret(seed).publicKey()
    }


    checkBalance(seed){
        let kp = StellarSdk.Keypair.fromSecret(seed)

        return fromPromise(
            this.server.loadAccount(kp.publicKey())
            .then(function(account) {
                return account;
            })
        );
    }


    checkBalanceFromPublicKey(account_id){
        let kp = StellarSdk.Keypair.fromPublicKey(account_id)
        return fromPromise(
            this.server.loadAccount(kp.publicKey())
            .then(function(account) {
                return account;
            })
        );
    }

    resolveFederatedAddress(address){
        return fromPromise(
            StellarSdk.FederationServer.resolve(address)
        );
    }


    seedIsValid(seed){
        try{
            StellarSdk.Keypair.fromSecret(seed);
            return true;
        } catch (e){
            return false;
        }
    }


    accountIsValid(account_id){
        try{
            StellarSdk.Keypair.fromPublicKey(account_id);
            return true;
        } catch (e){
            return false;
        }
    }
}
