import {
    NewPayeeActions,
    NewPayeeActionTypes
} from "@modules/payee/actions/new-payee.actions";

export interface State {
    success: boolean;
    pending: boolean;
    error: boolean | string;
}

export const initialState: State = {
    success: false,
    pending: false,
    error: false
};

export function reducer(state = initialState, action: NewPayeeActions): State {

    switch (action.type) {
        case NewPayeeActionTypes.NewPayee: {
            return {
                ...state,
                success: false,
                pending: true,
                error: false
            };
        }

        case NewPayeeActionTypes.NewPayeeSuccess: {
            return {
                ...state,
                success: true,
                pending: false,
                error: false
            };
        }

        case NewPayeeActionTypes.NewPayeeError: {
            return {
                ...state,
                success: false,
                pending: false,
                error: action.payload
            };
        }

        case NewPayeeActionTypes.ResetNewPayee: {
            return Object.assign({}, initialState);
        }

        default:
            return state;
    }
}

export const getSuccess = (state: State) => state.success;
export const getPending = (state: State) => state.pending;
export const getError = (state: State) => state.error;
