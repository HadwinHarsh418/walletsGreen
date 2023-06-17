import { Action } from '@ngrx/store';

export enum LoginActionTypes {
    LoginEmail = '[Contract] Login Email',
    LoginEmailFailure = '[Contract] Login Email Failure',
    LoginSuccess = '[Contract] Login Success',
    LongPolling = '[Contract] Long Polling',
    LongPollingSuccess = '[Contract] Long Polling Success',
    RequestSession = '[Contract] Request Session',
    SessionNotFound = '[Contract] Session Not Found'
}

export class LoginEmail implements Action {
    readonly type = LoginActionTypes.LoginEmail;
    constructor(public payload: any) {}
}

export class LoginSuccess implements Action {
    readonly type = LoginActionTypes.LoginSuccess;
    constructor(public payload: any) {}
}

export class LoginEmailFailure implements Action {

    readonly type = LoginActionTypes.LoginEmailFailure;
    constructor(public payload: any) {}
}

export class RequestSession implements Action {
    readonly type = LoginActionTypes.RequestSession;
}

export class SessionNotFound implements Action {
    readonly type = LoginActionTypes.SessionNotFound;
    constructor(public payload: any) {}
}

export class LongPolling implements Action {
  readonly type = LoginActionTypes.LongPolling;
  constructor(public payload: any) {
  }
}

export class LongPollingSuccess implements Action {
  readonly type = LoginActionTypes.LongPollingSuccess;
  constructor(public payload: any) {
    // console.log("Response " + payload)
  }
}


export type LoginActions =
LoginEmail |
LoginSuccess|
LoginEmailFailure |
LongPolling |
LongPollingSuccess |
RequestSession |
SessionNotFound;
