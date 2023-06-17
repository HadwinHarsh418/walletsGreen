import { ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';

import { environment } from '@environments/environment';
import * as merchantsReducer from './merchants.reducer';

export interface State {
    merchants: merchantsReducer.State;
}

export const reducers: ActionReducerMap<State> = {
    merchants: merchantsReducer.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const selectMerchantsState = createFeatureSelector<State>('super-admin');
export const selectMerchants = createSelector(selectMerchantsState, state => state.merchants);

export const getMerchants = createSelector(selectMerchants, merchantsReducer.getMerchants);
export const getMerchantsSuccess = createSelector(selectMerchants, merchantsReducer.getMerchantsSuccess);
export const getMerchantsPending = createSelector(selectMerchants, merchantsReducer.getMerchantsPending);
export const getMerchantsError = createSelector(selectMerchants, merchantsReducer.getMerchantsError);

