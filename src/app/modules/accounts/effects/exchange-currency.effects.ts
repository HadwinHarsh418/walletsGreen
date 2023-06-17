import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { exhaustMap, map, catchError } from 'rxjs/operators';
import { ExchangeCurrency, ExchangeCurrencySuccess, ExchangeCurrencyError, ExchangeCurrencyActionTypes } from '../actions/exchange-currency.actions';
import { of } from 'rxjs';
import { ExchangeCurrencyService } from '../service/exchange-currency.service';

@Injectable()
export class ExchangeCurrencyEffects {

  @Effect()
  login$ = this.actions$.pipe(

      ofType<ExchangeCurrency>(ExchangeCurrencyActionTypes.ExchangeCurrency),

      exhaustMap(action =>
          this.service.exchange(action.payload).pipe(
              map(result => new ExchangeCurrencySuccess(result)),
              catchError(error => of(new ExchangeCurrencyError(error)))
          )
      )
      
  );
  
  constructor(private actions$: Actions, private service: ExchangeCurrencyService) {}
}
