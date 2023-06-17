import { AccountsActions, AccountsActionTypes} from '@modules/accounts/actions/stellar-accounts.actions';
import { StellarAccount, StellarOperation } from '@root/interfaces/stellar-account.interface';

export interface State {
    success: boolean;
    pending: boolean;
    error: boolean | string;
    collection: Array<StellarAccount>
}

export const initialState: State = {
    success: false,
    pending: false,
    error: false,
    collection: []
};

export function reducer(state = initialState, action: AccountsActions): State {

    switch (action.type) {

        case AccountsActionTypes.GetAccounts:{
            return {
                ...state,
                success: false,
                pending: true,
                error: false,
            }
        }

        case AccountsActionTypes.GetAccountsSuccess:{
            return {
                ...state,
                success: true,
                pending: false,
                error: false,
                collection: action.payload
            }
        }

        case AccountsActionTypes.GetAccountsError:{
            return {
                ...state,
                success: false,
                pending: false,
                error: action.payload
            }
        }

        default:
            return state;
    }
}


export const getSuccess = (state: State) => state.success;
export const getPending = (state: State) => state.pending;
export const getError = (state: State) => state.error;
export const getCollection = (state: State) => state.collection;