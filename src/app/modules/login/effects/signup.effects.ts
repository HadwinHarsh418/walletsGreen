import { Injectable } from "@angular/core";
import {
    Signup,
    SignupActionTypes,
    SignupFailure,
    SignupSuccess,
    CreatePendingMerchant,
    CreatePendingMerchantSuccess,
    CreatePendingMerchantError
} from "@modules/login/actions/signup.actions";
import { SignupService } from "@modules/login/services/signup.service";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, exhaustMap, map } from "rxjs/operators";

@Injectable()
export class SignupEffects {
    @Effect()
    signup$ = this.actions$.pipe(
        ofType<Signup>(SignupActionTypes.Signup),
        exhaustMap(action =>
            this.service.signup(action.payload).pipe(
                map(result => new SignupSuccess(result)),
                catchError(error => of(new SignupFailure(error)))
            )
        )
    );

    @Effect()
    createPendingMerchant$ = this.actions$.pipe(
        ofType<CreatePendingMerchant>(SignupActionTypes.CreatePendingMerchant),
        exhaustMap(action =>
            this.service.createPendingMerchant(action.payload).pipe(
                map(result => new CreatePendingMerchantSuccess(result)),
                catchError(error => {
                    if (error.response.details) {
                        return of(new CreatePendingMerchantError(error.response.details.body[0]));
                    }
                    return of(new CreatePendingMerchantError(error.response));
                })
            )
        )
    );

    constructor(private actions$: Actions, private service: SignupService) {}
}
