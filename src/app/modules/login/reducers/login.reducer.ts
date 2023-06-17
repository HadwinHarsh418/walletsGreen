import { LoginActions, LoginActionTypes } from '@modules/login/actions/login.actions';

export interface State {
    isLoggedIn: boolean;
    pending: boolean;
    error: string | boolean;
}

export const initialState: State = {
    isLoggedIn: false,
    pending: false,
    error: false
};

export function reducer(state = initialState, action: LoginActions): State {
    switch (action.type) {

        case LoginActionTypes.LoginEmail: {
            return {
                ...state,
                pending: true,
                error: false
            };
        }

        case LoginActionTypes.LoginSuccess: {
            return {
                ...state,
                isLoggedIn: true,
                pending: false,
                error: false
            };
        }

        case LoginActionTypes.LoginEmailFailure: {
            return {
                ...state,
                pending: false,
                error: action.payload,
            };
        }

        case LoginActionTypes.LongPolling: {
          return {
            ...state,
            pending: false,
            error: action.payload,
          };
        }

        case LoginActionTypes.LongPollingSuccess: {
          return {
            ...state,
            pending: false,
            error: action.payload,
          };
        }

        default:
            return state;
    }
}

export const getIsLoggedIn = (state: State) => state.isLoggedIn;
export const getPending = (state: State) => state.pending;
export const getError = (state: State) => state.error;
