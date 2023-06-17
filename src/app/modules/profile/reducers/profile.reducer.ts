import { User } from '@root/interfaces/user.interface';
import { ProfileActions, ProfileActionTypes } from '../actions/profile.actions';

export interface State {
    collection: User;
    pending: boolean;
    error: string | boolean;
}

export const initialState: State = {
    collection: null,
    pending: false,
    error: false
};

export function reducer(state = initialState, action: ProfileActions): State {
    switch (action.type) {

        case ProfileActionTypes.UpdateProfile: {
            return {
                ...state,
                pending: true,
                error: false
            };
        }

        case ProfileActionTypes.UpdateProfileSuccess: {
            return {
                ...state,
                collection: action.payload,
                pending: false,
                error: false
            };
        }

        case ProfileActionTypes.UpdateProfileFailure: {
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

export const getCollection = (state: State) => state.collection;
export const getPending = (state: State) => state.pending;
export const getError = (state: State) => state.error;
