import { Action } from '@ngrx/store';

export enum TransactionsActionTypes {
    Buy = '[Transactions] Buy',
    BuySuccess = '[Transactions] Buy Success',
    BuyFailure = '[Transactions] Buy Failure',
    GetTransaction = '[Transactions] Get Transaction',
    GetTransactionSuccess = '[Transactions] Get Transaction Success',
    GetTransactionFailure = '[Transactions] Get Transaction Failure'
}

export class Buy implements Action {
    readonly type = TransactionsActionTypes.Buy;
    constructor(public payload: any) {}
}

export class BuySuccess implements Action {
    readonly type = TransactionsActionTypes.BuySuccess;
    constructor(public payload: any) {}
}

export class BuyFailure implements Action {
    readonly type = TransactionsActionTypes.BuyFailure;
    constructor(public payload: any) {}
}

export class GetTransaction implements Action {
    readonly type = TransactionsActionTypes.GetTransaction;
    constructor(public payload: any) {}
}

export class GetTransactionSuccess implements Action {
    readonly type = TransactionsActionTypes.GetTransactionSuccess;
    constructor(public payload: any) {}
}

export class GetTransactionFailure implements Action {
    readonly type = TransactionsActionTypes.GetTransactionFailure;
    constructor(public payload: any) {}
}


export type TransactionsActions =
GetTransaction |
GetTransactionSuccess |
GetTransactionFailure |
Buy |
BuySuccess |
BuyFailure;
