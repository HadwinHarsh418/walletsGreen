import { Action } from "@ngrx/store";
import { AnonymousSubject } from "rxjs/internal/Subject";
import { SendPaymentInterface } from "@root/modules/accounts/interfaces/send-payment.interface";

export enum SendPaymentActionTypes {
    SendPayment = "[SendPayment] Send Payment",
    SendPaymentSuccess = "[SendPayment] Send Payment Success",
    SendPaymentError = "[SendPayment] Send Payment Error",
    ResetSendPayment = "[SendPayment] Reset Send Payment",
}

export class SendPayment implements Action {
    readonly type = SendPaymentActionTypes.SendPayment;
    constructor(public payload: SendPaymentInterface) {}
}

export class SendPaymentSuccess implements Action {
    readonly type = SendPaymentActionTypes.SendPaymentSuccess;
    constructor(public payload: any) {}
}

export class SendPaymentError implements Action {
    readonly type = SendPaymentActionTypes.SendPaymentError;
    constructor(public payload: any) {}
}

export class ResetSendPayment implements Action {
    readonly type = SendPaymentActionTypes.ResetSendPayment;
}

export type SendPaymentActions =
    | SendPayment
    | SendPaymentSuccess
    | SendPaymentError
    | ResetSendPayment;
