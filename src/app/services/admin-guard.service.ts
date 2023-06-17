import { Injectable } from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as loginReducers from '@modules/login/reducers';
import {Router} from '@angular/router';
import {combineLatest} from 'rxjs';
import {map, skipWhile} from 'rxjs/operators';
import {removeUserToken} from '@root/helpers/tokenStorage';
import {ROLES} from '@root/resources/enums/role.enum';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {

  public loggedIn$ = this.store.pipe(select(loginReducers.getIsLoggedIn));
  public user$ = this.store.pipe(select(loginReducers.getUser));
  public sessionPending$ = this.store.pipe(select(loginReducers.getSessionPending));

  constructor(
    private store: Store<loginReducers.State>,
    private router: Router
  ) { }

  canActivate() {
    return this.loggedInOrRedirect();
  }

  canActivateChild() {
    return this.loggedInOrRedirect();
  }

  loggedInOrRedirect() {
    return combineLatest(
      this.loggedIn$,
      this.user$,
      this.sessionPending$.pipe(skipWhile(val => val))
    )
      .pipe(
        map(res => {
          const isLoggedIn = res[0];
          const user = res[1];
          return isLoggedIn && (user.role === ROLES.ADMIN || user.role === ROLES.SUPER_ADMIN);
        })
      );
  }
}
