import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Buy, BuySuccess, BuyFailure, GetTransaction, GetTransactionSuccess, GetTransactionFailure, TransactionsActionTypes } from '@root/modules/transactions/actions/transactions.actions';
import { exhaustMap, map, catchError } from "rxjs/operators";
import { TransactionsService } from "@root/modules/transactions/services/transactions.service";
import { of } from "rxjs";


@Injectable()
export class TransactionsEffects {
    @Effect()
    buy$ = this.actions$.pipe(
        ofType<Buy>(TransactionsActionTypes.Buy),
        exhaustMap(action =>
            this.transactionsService.buy(action.payload).pipe(
                map(result => {
                    return new BuySuccess(result);
                }),
                catchError(error => of(new BuyFailure(error)))
            )
        )
    );

    @Effect({dispatch: false})
    buySuccess$ = this.actions$.pipe(
        ofType<BuySuccess>(TransactionsActionTypes.BuySuccess),
        map(action =>  this.transactionsService.buyRedirect(action.payload))
    );

    @Effect()
    GetTransaction$ = this.actions$.pipe(
        ofType<GetTransaction>(TransactionsActionTypes.GetTransaction),
        exhaustMap(action =>
            this.transactionsService.getTransaction(action.payload).pipe(
                map(result => new GetTransactionSuccess(result)),
                catchError(error => of(new GetTransactionFailure(error)))
            )
        )
    );

    constructor(private actions$: Actions, private transactionsService: TransactionsService) {}
}
