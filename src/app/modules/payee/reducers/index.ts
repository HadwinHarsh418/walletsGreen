import {
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
} from '@ngrx/store';

import { environment } from '@environments/environment';

import * as sendPayment from '@modules/payee/reducers/send-payment.reducer';
import * as newPayee from '@modules/payee/reducers/new-payee.reducer';
import * as root from '@root/reducers'

export interface PayeeState {
    sendPayment: sendPayment.State
    newPayee: newPayee.State
}

export interface State extends root.State {
    payee: PayeeState
}

export const reducers: ActionReducerMap<PayeeState> = {
    sendPayment: sendPayment.reducer,
    newPayee: newPayee.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const selectPayeeState = createFeatureSelector<PayeeState>('payee');

export const selectSendPayment = createSelector(selectPayeeState, state => state.sendPayment);
export const getSendPaymentSuccess = createSelector(selectSendPayment, sendPayment.getSuccess);
export const getSendPaymentPending = createSelector(selectSendPayment, sendPayment.getPending);
export const getSendPaymentError = createSelector(selectSendPayment, sendPayment.getError);

export const selectNewPayee = createSelector(selectPayeeState, state => state.newPayee);
export const getNewPayeeSuccess = createSelector(selectNewPayee, newPayee.getSuccess);
export const getNewPayeePending = createSelector(selectNewPayee, newPayee.getPending);
export const getNewPayeeError = createSelector(selectNewPayee, newPayee.getError);
