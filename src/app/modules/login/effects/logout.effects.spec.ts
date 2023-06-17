import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { LogoutEffects } from '@modules/login/effects/logout.effects';

describe('LogoutService', () => {
  let actions$: Observable<any>;
  let effects: LogoutEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LogoutEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(LogoutEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
