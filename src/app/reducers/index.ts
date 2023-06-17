import { ActionReducerMap, ActionReducer, MetaReducer } from "@ngrx/store";

import { LogoutActionTypes } from "@modules/login/actions/logout.actions";
import { environment } from "@environments/environment";

export interface State { }

export const reducers: ActionReducerMap<State> = {};

export function logout(reducer: ActionReducer<any>): ActionReducer<any> {
    return function (state, action) {
        return reducer(
            action.type === LogoutActionTypes.LogoutSuccess ? undefined : state,
            action
        );
    };
}

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
    return function (state, action) {
        // console.log(action);
        return reducer(state, action);
    };
}

export const metaReducers: MetaReducer<State>[] = environment.production ? [logout] : [logout, debug];
