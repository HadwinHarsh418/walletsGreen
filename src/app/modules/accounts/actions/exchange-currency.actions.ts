import { Action } from '@ngrx/store';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { ExchangeCurrencyInterface } from '@root/modules/accounts/interfaces/exchange-currency.interface';

export enum ExchangeCurrencyActionTypes {
  ExchangeCurrency = '[ExchangeCurrency] Exchange Currency',
  ExchangeCurrencySuccess = '[ExchangeCurrency] Exchange Currency Success',
  ExchangeCurrencyError = '[ExchangeCurrency] Exchange Currency Error',
  ResetExchangeCurrency = '[ExchangeCurrency] Reset Exchange Currency'
}

export class ExchangeCurrency implements Action {
  readonly type = ExchangeCurrencyActionTypes.ExchangeCurrency;
  constructor(public payload: ExchangeCurrencyInterface) { }
}

export class ExchangeCurrencySuccess implements Action {
  readonly type = ExchangeCurrencyActionTypes.ExchangeCurrencySuccess;
  constructor(public payload: any) { }
}

export class ExchangeCurrencyError implements Action {
  readonly type = ExchangeCurrencyActionTypes.ExchangeCurrencyError;
  constructor(public payload: any) { }
}

export class ResetExchangeCurrency implements Action {
  readonly type = ExchangeCurrencyActionTypes.ResetExchangeCurrency;
}

export type ExchangeCurrencyActions = ExchangeCurrency | ExchangeCurrencySuccess | ExchangeCurrencyError | ResetExchangeCurrency;
