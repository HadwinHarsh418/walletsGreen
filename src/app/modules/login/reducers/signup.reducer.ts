import { SignupActions, SignupActionTypes } from '@modules/login/actions/signup.actions';

export interface State {
    user: any;
    success: boolean;
    pending: boolean;
    createPendingSuccess: boolean;
    createPendingPending: boolean;
    createPendingError: boolean;
    error: string | boolean;
}

export const initialState: State = {
    user: null,
    success: false,
    pending: false,
    error: false,
    createPendingSuccess: false,
    createPendingPending: false,
    createPendingError: false
};

export function reducer(state = initialState, action: SignupActions): State {
    switch (action.type) {

        case SignupActionTypes.Signup: {
            return {
                ...state,
                user: action.payload,
                success: false,
                pending: true,
                error: false
            };
        }

        case SignupActionTypes.SignupSuccess: {
            return {
                ...state,
                success: true,
                pending: false,
                error: false
            };
        }

        case SignupActionTypes.SignupFailure: {
            return {
                ...state,
                success: false,
                pending: false,
                error: action.payload,
            };
        }

        case SignupActionTypes.CreatePendingMerchant: {
            return {
                ...state,
                success: false,
                pending: true,
                error: false
            };
        }

        case SignupActionTypes.CreatePendingMerchantSuccess: {
            return {
                ...state,
                success: true,
                pending: false,
                error: false
            };
        }

        case SignupActionTypes.CreatePendingMerchantError: {
            return {
                ...state,
                success: false,
                pending: false,
                error: action.payload,
            };
        }

        default:
            return state;
    }
}

export const getUser = (state: State) => state.user;
export const getSuccess = (state: State) => state.success;
export const getPending = (state: State) => state.pending;
export const getError = (state: State) => state.error;
