import { LoginActions, LoginActionTypes } from '@modules/login/actions/login.actions';

export interface State {
    pending: boolean;
    error: string | boolean;
}

export const initialState: State = {
    pending: false,
    error: false
};

export function reducer(state = initialState, action: LoginActions): State {
    switch (action.type) {

        case LoginActionTypes.RequestSession: {
            return {
                ...state,
                pending: true,
                error: false
            };
        }

        case LoginActionTypes.LoginSuccess: {
            return {
                ...state,
                pending: false,
                error: false
            };
        }

        case LoginActionTypes.SessionNotFound: {
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

export const getPending = (state: State) => state.pending;
export const getError = (state: State) => state.error;
