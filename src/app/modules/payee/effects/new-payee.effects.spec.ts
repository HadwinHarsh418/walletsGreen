import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { NewPayeeEffects } from './new-payee.effects';

describe('NewPayeeEffects', () => {
  let actions$: Observable<any>;
  let effects: NewPayeeEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NewPayeeEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(NewPayeeEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
