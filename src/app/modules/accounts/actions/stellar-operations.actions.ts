import { Action } from '@ngrx/store';
import { StellarAccount, StellarOperation } from '@root/interfaces/stellar-account.interface';

export enum OperationsActionTypes {
    GetOperations = '[Accounts] Get Operations',
    GetOperationsSuccess = '[Accounts] Get Operations Success',
    GetOperationsError = '[Accounts] Get Operations Error'
}

export class GetOperations implements Action {
    readonly type = OperationsActionTypes.GetOperations;
    constructor(public payload: string) { }
}

export class GetOperationsSuccess implements Action {
    readonly type = OperationsActionTypes.GetOperationsSuccess;
    constructor(public payload: { account_id: string, operations: Array<StellarOperation> }) { }
}

export class GetOperationsError implements Action {
    readonly type = OperationsActionTypes.GetOperationsError;
    constructor(public payload: any) { }
}

export type OperationsActions = 
GetOperations |
GetOperationsSuccess |
GetOperationsError;