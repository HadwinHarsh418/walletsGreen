import { Action } from '@ngrx/store';
import { ExchangeCurrencyActions, ExchangeCurrencyActionTypes } from '@modules/accounts/actions/exchange-currency.actions';

export interface State {
  success: boolean
  pending: boolean
  error: boolean | string
}

export const initialState: State = {
  success: false,
  pending: false,
  error: false
};

export function reducer(state = initialState, action: ExchangeCurrencyActions): State {
  switch (action.type) {

    case ExchangeCurrencyActionTypes.ExchangeCurrency: {
      return {
        ... state,
        success: false,
        pending: true,
        error: false
      }
    }

    case ExchangeCurrencyActionTypes.ExchangeCurrencySuccess: {
      return {
        ... state,
        success: true,
        pending: false,
        error: false
      }
    }

    case ExchangeCurrencyActionTypes.ExchangeCurrencyError: {
      return {
        ... state,
        success: false,
        pending: false,
        error: action.payload
      }
    }

    case ExchangeCurrencyActionTypes.ResetExchangeCurrency: {
      return Object.assign({}, initialState)
    }

    default:
      return state;
  }
}

export const getSuccess = (state: State) => state.success;
export const getPending = (state: State) => state.pending;
export const getError = (state: State) => state.error;