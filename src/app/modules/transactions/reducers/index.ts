import {
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
} from '@ngrx/store';

import { environment } from '@environments/environment';

import * as transactions from '@modules/transactions/reducers/transactions.reducer';
import * as root from '../../../reducers';

export interface TransactionsState {
    transactions: transactions.State
}

export interface State extends root.State {
    transactions: TransactionsState
}

export const reducers: ActionReducerMap<TransactionsState> = {
    transactions: transactions.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const selectBuyState = createFeatureSelector<TransactionsState>('transactions');
export const selectBuy = createSelector(selectBuyState, state => state.transactions);
export const getTransactionFees = createSelector(selectBuy, transactions.getTransactionFees);
