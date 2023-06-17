import { Action } from '@ngrx/store';
import { Account } from '@root/interfaces/account.interface';
import { StellarAccount } from '@root/interfaces/stellar-account.interface';

export enum AccountsActionTypes {
    GetAccounts = '[Accounts] Get Accounts',
    GetAccountsSuccess = '[Accounts] Get Accounts Success',
    GetAccountsError = '[Accounts] Get Accounts Error'
}

export class GetAccounts implements Action {
    readonly type = AccountsActionTypes.GetAccounts;
    constructor(public payload: Array<Account>) { }
}

export class GetAccountsSuccess implements Action {
    readonly type = AccountsActionTypes.GetAccountsSuccess;
    constructor(public payload: Array<StellarAccount>) { }
}

export class GetAccountsError implements Action {
    readonly type = AccountsActionTypes.GetAccountsError;
    constructor(public payload: any) { }
}

export type AccountsActions = 
GetAccounts |
GetAccountsSuccess |
GetAccountsError;