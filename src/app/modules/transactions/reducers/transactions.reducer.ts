import { TransactionsActions, TransactionsActionTypes } from '@root/modules/transactions/actions/transactions.actions';

export interface State {
    result: any;
    pending: boolean;
    success: boolean;
    transactionFees: any;
    transactionFeesPending: boolean;
    error: any;
}

export const initialState: State = {
    result: null,
    pending: false,
    success: false,
    error: false,
    transactionFees: {},
    transactionFeesPending: false,
};

export function reducer(state = initialState, action: TransactionsActions): State {
    switch (action.type) {

        case TransactionsActionTypes.Buy:{
            return {
                ...state,
                result: null,
                pending: true,
                error: false
            }
        }

        case TransactionsActionTypes.BuySuccess:{
            return {
                ...state,
                result: action.payload,
                pending: false,
                error: false
            }
        }

        case TransactionsActionTypes.BuyFailure:{
            return {
                ...state,
                result: null,
                pending: false,
                error: action.payload
            }
        }

        case TransactionsActionTypes.GetTransaction:{
            return {
                ...state,
                transactionFees: {},
                transactionFeesPending: true,
                error: false
            }
        }

        case TransactionsActionTypes.GetTransactionSuccess:{
            return {
                ...state,
                transactionFees: action.payload,
                transactionFeesPending: false
            }
        }

        case TransactionsActionTypes.GetTransactionFailure:{
            return {
                ...state,
                transactionFeesPending: false,
                error: action.payload
            }
        }

        default:
            return state;
    }
}

export const getTransactionFees = (state: State) => state.transactionFees;
