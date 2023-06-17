import { ResetActions, ResetActionTypes } from '../actions/reset.actions';

export interface State {
    success: boolean;
    pending: boolean;
    error: string | boolean;
}

export const initialState: State = {
    success: false,
    pending: false,
    error: false
};

export function reducer(state = initialState, action: ResetActions): State {
    switch (action.type) {

        case ResetActionTypes.ResetPassword: {
            return {
                ...state,
                success: false,
                pending: true,
                error: false
            };
        }

        case ResetActionTypes.ResetPasswordSuccess: {
            return {
                ...state,
                success: true,
                pending: false,
                error: false
            };
        }

        case ResetActionTypes.ResetPasswordFailure: {
            return {
                ...state,
                success: false,
                pending: false,
                error: action.payload,
            };
        }

        case ResetActionTypes.RequestPasswordReset: {
            return {
                ...state,
                success: false,
                pending: true,
                error: false
            };
        }

        case ResetActionTypes.RequestPasswordResetSuccess: {
            return {
                ...state,
                success: true,
                pending: false,
                error: false
            };
        }

        case ResetActionTypes.RequestPasswordResetFailure: {
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

export const getSuccess = (state: State) => state.success;
export const getPending = (state: State) => state.pending;
export const getError = (state: State) => state.error;
