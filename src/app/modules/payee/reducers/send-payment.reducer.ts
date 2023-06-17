import { Action } from '@ngrx/store';
import { SendPaymentActions, SendPaymentActionTypes } from '@modules/payee/actions/send-payment.actions';

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

export function reducer(state = initialState, action: SendPaymentActions): State {
  switch (action.type) {

    case SendPaymentActionTypes.SendPayment: {
      return {
        ... state,
        success: false,
        pending: true,
        error: false
      }
    }

    case SendPaymentActionTypes.SendPaymentSuccess: {
      return {
        ... state,
        success: true,
        pending: false,
        error: false
      }
    }

    case SendPaymentActionTypes.SendPaymentError: {
      return {
        ... state,
        success: false,
        pending: false,
        error: action.payload
      }
    }

    case SendPaymentActionTypes.ResetSendPayment: {
      return Object.assign({}, initialState)
    }

    default:
      return state;
  }
}

export const getSuccess = (state: State) => state.success;
export const getPending = (state: State) => state.pending;
export const getError = (state: State) => state.error;