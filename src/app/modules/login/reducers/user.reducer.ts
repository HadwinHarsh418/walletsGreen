import { UserActions, UserActionTypes } from '@modules/login/actions/user.actions';
import { User } from '@root/modules/login/interfaces/user.interface';

export interface State extends User {
    [x: string]: any;
}

export const initialState: State = {
    publicKey: null
};

export function reducer(state = initialState, action: UserActions): State {
    switch (action.type) {

        case UserActionTypes.GetUserSuccess: {
            return action.payload;
        }

        case UserActionTypes.UpdateUserSuccess: {
            return {
                ...state,
                ...action.payload
            };
        }

        default:
            return state;
    }
}

export const getUser = (state: State) => state;
export const getUserRole = (state: State) => state.role;
