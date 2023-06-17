import { Action } from '@ngrx/store';

export enum LogoutActionTypes {
    Logout = '[Contract] Logout',
    LogoutSuccess = '[Contract] Logout Success',
    LogoutFailure = '[Contract] Logout Failure'
}

export class Logout implements Action {
    readonly type = LogoutActionTypes.Logout;
    // constructor(public payload: any) {}
}

export class LogoutSuccess implements Action {
    readonly type = LogoutActionTypes.LogoutSuccess;
}

export class LogoutFailure implements Action {
    readonly type = LogoutActionTypes.LogoutFailure;
    constructor(public payload: any) {}
}

export type LoginActions =
Logout |
LogoutSuccess |
LogoutFailure;
