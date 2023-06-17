import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ExchangeCurrencyEffects } from './exchange-currency.effects';

describe('ExchangeCurrencyEffects', () => {
  let actions$: Observable<any>;
  let effects: ExchangeCurrencyEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ExchangeCurrencyEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(ExchangeCurrencyEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
