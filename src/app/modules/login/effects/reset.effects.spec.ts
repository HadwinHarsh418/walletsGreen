import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ResetEffects } from './reset.effects';

describe('ResetEffects', () => {
  let actions$: Observable<any>;
  let effects: ResetEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ResetEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(ResetEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
