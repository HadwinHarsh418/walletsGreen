import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { exhaustMap, map, catchError } from 'rxjs/operators';
import {
    ResetActionTypes,
    RequestPasswordReset,
    RequestPasswordResetSuccess,
    ResetPassword,
    ResetPasswordSuccess,
    ResetPasswordFailure,
    RequestPasswordResetFailure
} from '../actions/reset.actions';
import { ResetService } from '../services/reset.service';
import { of } from 'rxjs';

@Injectable()
export class ResetEffects {

    @Effect()
    requestReset$ = this.actions$.pipe(
        ofType<RequestPasswordReset>(ResetActionTypes.RequestPasswordReset),
        exhaustMap(action =>
            this.service.requestReset(action.payload).pipe(
                map(result => new RequestPasswordResetSuccess(result)),
                catchError(error => of(new RequestPasswordResetFailure(error)))
            )
        )
    );

    @Effect()
    resetPassword$ = this.actions$.pipe(
        ofType<ResetPassword>(ResetActionTypes.ResetPassword),
        exhaustMap(action =>
            this.service.resetPassword(action.payload).pipe(
                map(result => new ResetPasswordSuccess(result)),
                catchError(error => of(new ResetPasswordFailure(error)))
            )
        )
    );

    constructor(private actions$: Actions, private service: ResetService) { }
}
