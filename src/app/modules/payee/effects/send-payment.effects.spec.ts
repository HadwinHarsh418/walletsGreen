import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SendPaymentEffects } from './send-payment.effects';

describe('SendPaymentEffects', () => {
  let actions$: Observable<any>;
  let effects: SendPaymentEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SendPaymentEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(SendPaymentEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
