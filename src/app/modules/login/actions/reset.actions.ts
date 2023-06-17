import { Action } from '@ngrx/store';

export enum ResetActionTypes {
    RequestPasswordReset = '[Login] RequestPasswordReset',
    RequestPasswordResetFailure = '[Login] RequestPasswordReset Failure',
    RequestPasswordResetSuccess = '[Login] RequestPasswordReset Success',
    ResetPassword = '[Login] ResetPassword',
    ResetPasswordFailure = '[Login] ResetPassword Failure',
    ResetPasswordSuccess = '[Login] ResetPassword Success',
}

export class RequestPasswordReset implements Action {
    readonly type = ResetActionTypes.RequestPasswordReset;
    constructor(public payload: any) {}
}

export class RequestPasswordResetSuccess implements Action {
    readonly type = ResetActionTypes.RequestPasswordResetSuccess;
    constructor(public payload: any) {}
}

export class RequestPasswordResetFailure implements Action {
    readonly type = ResetActionTypes.RequestPasswordResetFailure;
    constructor(public payload: any) {}
}

export class ResetPassword implements Action {
    readonly type = ResetActionTypes.ResetPassword;
    constructor(public payload: any) {}
}

export class ResetPasswordSuccess implements Action {
    readonly type = ResetActionTypes.ResetPasswordSuccess;
    constructor(public payload: any) {}
}

export class ResetPasswordFailure implements Action {
    readonly type = ResetActionTypes.ResetPasswordFailure;
    constructor(public payload: any) {}
}

export type ResetActions =
RequestPasswordReset |
RequestPasswordResetSuccess|
RequestPasswordResetFailure|
ResetPassword|
ResetPasswordFailure|
ResetPasswordSuccess;
