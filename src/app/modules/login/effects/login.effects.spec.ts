import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { LoginEffects } from '@modules/login/effects/login.effects';

describe('LoginService', () => {
  let actions$: Observable<any>;
  let effects: LoginEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(LoginEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
