import { OperationsActions, OperationsActionTypes } from '@modules/accounts/actions/stellar-operations.actions';
import { StellarOperation } from '@root/interfaces/stellar-account.interface';

export interface State {
    collection: Array<{
        account_id: string;
        success: boolean;
        pending: boolean;
        error: boolean | string;
        operations: Array<StellarOperation>
    }>
}

export const initialState: State = {
    collection: []
};

const findAndReplace = (operation, collection) => {
    for (var i in collection) {
        if (collection[i].account_id == operation.account_id) {
            collection[i] = operation;
            break;
        }
    }
    return collection.slice();
}

export function reducer(state = initialState, action: OperationsActions): State {

    switch (action.type) {

        case OperationsActionTypes.GetOperations: {

            let op = state.collection.find(s => s.account_id === action.payload)

            if (op) {
                let operation = {
                    ...op, 
                    success: false,
                    pending: true,
                    error: false
                }
                return {
                    ...state,
                    collection: findAndReplace(operation, state.collection)
                }
            }

            let operation = {
                account_id: action.payload,
                success: false,
                pending: true,
                error: false,
                operations: []
            }
            return {
                ...state,
                collection: [...state.collection, operation]
            }
        }

        case OperationsActionTypes.GetOperationsSuccess: {
            let operation = Object.assign({}, {
                account_id: action.payload.account_id,
                operations: action.payload.operations,
                success: true,
                pending: false,
                error: false
            })
            return {
                ...state,
                collection: findAndReplace(operation, state.collection)
            }
        }

        case OperationsActionTypes.GetOperationsError: {
            let op = state.collection.find(s => s.account_id === action.payload.account_id)
            let operation = {
                ...op,
                account_id: action.payload.account_id,
                success: false,
                pending: false,
                error: action.payload.error
            }
            return {
                ...state,
                collection: findAndReplace(operation, state.collection)
            }
        }

        default:
            return state;
    }
}


export const getCollection = (state: State) => state.collection;