import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { exhaustMap, switchMap, catchError, map } from "rxjs/operators";
import { of } from "rxjs";

import {
    NewPayee,
    NewPayeeSuccess,
    NewPayeeError,
    NewPayeeActionTypes
} from "@modules/payee/actions/new-payee.actions";
import { SendPaymentService } from "@root/modules/payee/service/send-payment.service";
import { GetUserSuccess } from "@root/modules/login/actions/user.actions";

@Injectable()
export class NewPayeeEffects {
    @Effect()
    login$ = this.actions$.pipe(
        ofType<NewPayee>(NewPayeeActionTypes.NewPayee),

        exhaustMap(action =>
            this.service.newPayee(action.payload).pipe(
                switchMap(result => [
                    new NewPayeeSuccess(result),
                    // new GetUserSuccess(<any>result)
                ]),
                catchError(error => of(new NewPayeeError(error)))
            )
        )
    );

    constructor(
        private actions$: Actions,
        private service: SendPaymentService
    ) {}
}
