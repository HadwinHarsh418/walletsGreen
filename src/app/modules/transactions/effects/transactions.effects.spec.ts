import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { TransactionsEffects } from './transactions.effects';

describe('BuyEffects', () => {
  let actions$: Observable<any>;
  let effects: TransactionsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TransactionsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(TransactionsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
