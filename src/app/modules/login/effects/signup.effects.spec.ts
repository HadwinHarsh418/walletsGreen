import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SignupEffects } from '@modules/login/effects/signup.effects';

describe('SignupService', () => {
  let actions$: Observable<any>;
  let effects: SignupEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SignupEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(SignupEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
