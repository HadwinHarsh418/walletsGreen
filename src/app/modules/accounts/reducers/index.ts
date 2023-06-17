import {
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer,
} from "@ngrx/store";

import { environment } from "@environments/environment";

import * as sendPayment from "@modules/accounts/reducers/send-payment.reducer";
import * as root from "@root/reducers";

import * as stellarAccounts from "@modules/accounts/reducers/stellar-accounts.reducer";
import * as stellarOperations from "@modules/accounts/reducers/stellar-operations.reducer";

import * as exchangeCurrency from "@modules/accounts/reducers/exchange-currency.reducer";

export interface AccountsState {
    sendPayment: sendPayment.State;
    stellarAccounts: stellarAccounts.State;
    stellarOperations: stellarOperations.State;
    exchangeCurrency: exchangeCurrency.State;
}

export interface State extends root.State {
    sendPayment: AccountsState;
    exchangeCurrency: AccountsState;
}

export const reducers: ActionReducerMap<AccountsState> = {
    sendPayment: sendPayment.reducer,
    stellarAccounts: stellarAccounts.reducer,
    stellarOperations: stellarOperations.reducer,
    exchangeCurrency: exchangeCurrency.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
    ? []
    : [];

export const selectAccountsState =
    createFeatureSelector<AccountsState>("accounts");

export const selectSendPayment = createSelector(
    selectAccountsState,
    (state) => state.sendPayment
);
export const getSendPaymentSuccess = createSelector(
    selectSendPayment,
    sendPayment.getSuccess
);
export const getSendPaymentPending = createSelector(
    selectSendPayment,
    sendPayment.getPending
);
export const getSendPaymentError = createSelector(
    selectSendPayment,
    sendPayment.getError
);

export const selectStellarAccounts = createSelector(
    selectAccountsState,
    (state) => state.stellarAccounts
);
export const getStellarAccounts = createSelector(
    selectStellarAccounts,
    stellarAccounts.getCollection
);
export const getStellarAccountsSuccess = createSelector(
    selectStellarAccounts,
    stellarAccounts.getSuccess
);
export const getStellarAccountsPending = createSelector(
    selectStellarAccounts,
    stellarAccounts.getPending
);
export const getStellarAccountsError = createSelector(
    selectStellarAccounts,
    stellarAccounts.getError
);

export const selectExchangeCurrency = createSelector(
    selectAccountsState,
    (state) => state.exchangeCurrency
);
export const getExchangeCurrencySuccess = createSelector(
    selectExchangeCurrency,
    exchangeCurrency.getSuccess
);
export const getExchangeCurrencyPending = createSelector(
    selectExchangeCurrency,
    exchangeCurrency.getPending
);
export const getExchangeCurrencyError = createSelector(
    selectExchangeCurrency,
    exchangeCurrency.getError
);
