import { Injectable } from '@angular/core';
import {
  LoginActionTypes,
  LoginEmail,
  LoginEmailFailure,
  LoginSuccess,
  RequestSession,
  SessionNotFound,
  LongPolling,
  LongPollingSuccess,
} from '@modules/login/actions/login.actions';
import { GetUserSuccess } from '@modules/login/actions/user.actions';
import { LoginService } from '@modules/login/services/login.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import { setUserToken } from '@root/helpers/tokenStorage';

@Injectable()
export class LoginEffects {
  @Effect()
  login$ = this.actions$.pipe(
    ofType<LoginEmail>(LoginActionTypes.LoginEmail),
    exhaustMap(action =>
      this.service.login(action.payload).pipe(
        switchMap(result => {
          setUserToken(JSON.stringify(result.token));
          return [new LoginSuccess(result.user), new GetUserSuccess(result.user)];
        }),
        catchError(error => of(new LoginEmailFailure(error)))
      )
    )
  );

  @Effect()
  session$ = this.actions$.pipe(
    ofType<RequestSession>(LoginActionTypes.RequestSession),
    exhaustMap(action =>
      this.service.session().pipe(
        switchMap(result => [
          new GetUserSuccess(result),
          new LoginSuccess(result),
        ]),
        catchError(error => of(new SessionNotFound(error)))
      )
    )
  );

  @Effect()
  longPolling$ = this.actions$.pipe(
    ofType<LongPolling>(LoginActionTypes.LongPolling),
    exhaustMap(action =>
      this.service.longPolling(action.payload).pipe(
        switchMap(result => {
          if (result.Token !== undefined) {
            // Update the new token
            setUserToken(result.token);
          }
          return [new LongPollingSuccess(result)];
        }),
        catchError(error => of(new SessionNotFound(error)))
      )
    )
  );

  constructor(private actions$: Actions, private service: LoginService) {}
}
