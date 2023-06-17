import {
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
} from '@ngrx/store';

import { environment } from '@environments/environment';

import * as login from '@modules/login/reducers/login.reducer';
import * as session from '@modules/login/reducers/session.reducer';
import * as signup from '@modules/login/reducers/signup.reducer';
import * as user from '@modules/login/reducers/user.reducer';
import * as reset from '@modules/login/reducers/reset.reducer';

import * as root from '../../../reducers';

export interface LoginState {
    login: login.State;
    session: session.State;
    user: user.State;
    signup: signup.State;
    reset: reset.State;
}

export interface State extends root.State {
    login: LoginState;
}

export const reducers: ActionReducerMap<LoginState> = {
    login: login.reducer,
    session: session.reducer,
    user: user.reducer,
    signup: signup.reducer,
    reset: reset.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const selectLoginState = createFeatureSelector<LoginState>('login');

export const selectUser = createSelector(selectLoginState, state => state.user);
export const getUser = createSelector(selectUser, user.getUser);
export const getUserRole = createSelector(selectUser, user.getUserRole);

export const selectLogin = createSelector(selectLoginState, state => state.login);
export const getIsLoggedIn = createSelector(selectLogin, login.getIsLoggedIn);
export const getLoginPending = createSelector(selectLogin, login.getPending);
export const getLoginError = createSelector(selectLogin, login.getError);

export const selectSignup = createSelector(selectLoginState, state => state.signup);
export const getSignupUser = createSelector(selectSignup, signup.getUser);
export const getSignupSuccess = createSelector(selectSignup, signup.getSuccess);
export const getSignupPending = createSelector(selectSignup, signup.getPending);
export const getSignupError = createSelector(selectSignup, signup.getError);

export const selectSession = createSelector(selectLoginState, state => state.session);
export const getSessionPending = createSelector(selectSession, session.getPending);
export const getSessionError = createSelector(selectSession, session.getError);

export const selectReset = createSelector(selectLoginState, state => state.reset);
export const resetSuccess = createSelector(selectReset, reset.getSuccess);
export const resetPending = createSelector(selectReset, reset.getPending);
export const resetError = createSelector(selectReset, reset.getError);
