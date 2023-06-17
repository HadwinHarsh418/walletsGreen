import { Action } from '@ngrx/store';

export enum SignupActionTypes {
    Signup = '[Contract] Signup',
    SignupSuccess = '[Contract] Signup Success',
    SignupFailure = '[Contract] Signup Failure',
    CreatePendingMerchant = '[Contract] Create Pending Merchant',
    CreatePendingMerchantSuccess = '[Contract] Create Pending Merchant Success',
    CreatePendingMerchantError = '[Contract] Create Pending Merchant Error',
}

export class Signup implements Action {
    readonly type = SignupActionTypes.Signup;
    constructor(public payload: any) {}
}

export class SignupSuccess implements Action {
    readonly type = SignupActionTypes.SignupSuccess;
    constructor(public payload: any) {}
}

export class SignupFailure implements Action {
    readonly type = SignupActionTypes.SignupFailure;
    constructor(public payload: any) {}
}

export class CreatePendingMerchant implements Action {
    readonly type = SignupActionTypes.CreatePendingMerchant;
    constructor(public payload: any) {}
}

export class CreatePendingMerchantSuccess implements Action {
    readonly type = SignupActionTypes.CreatePendingMerchantSuccess;
    constructor(public payload: any) {}
}

export class CreatePendingMerchantError implements Action {
    readonly type = SignupActionTypes.CreatePendingMerchantError;
    constructor(public payload: any) {}
}

export type SignupActions =
Signup |
SignupSuccess |
SignupFailure |
CreatePendingMerchant |
CreatePendingMerchantSuccess |
CreatePendingMerchantError ;
