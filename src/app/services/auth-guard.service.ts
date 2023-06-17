import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import * as loginReducers from '@modules/login/reducers';
import { select, Store } from '@ngrx/store';
import { map, skipWhile } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { removeUserToken } from '@root/helpers/tokenStorage';
import { ROLES } from '@root/resources/enums/role.enum';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate, CanActivateChild {

    public user$ = this.store.pipe(select(loginReducers.getUser));
    public loggedIn$ = this.store.pipe(select(loginReducers.getIsLoggedIn));
    public sessionPending$ = this.store.pipe(select(loginReducers.getSessionPending));

    constructor(
      private store: Store<loginReducers.State>,
      private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) {
      console.log('stete',state);
      
      return this.loggedInOrRedirect();
    }

    canActivateChild() {
      return this.loggedInOrRedirect();
    }

    loggedInOrRedirect() {
      return combineLatest(
        this.user$,
        this.loggedIn$,
        this.sessionPending$.pipe(skipWhile(val => val))
      )
      .pipe(
        map(res => {
          const user = res[0];
          const isLoggedIn = res[1];
          console.log("In 40",user.role, isLoggedIn, user.role === ROLES.MERCHANT||ROLES.ADMIN||ROLES.SUPER_ADMIN)
          if (isLoggedIn && user.role === ROLES.MERCHANT) {
            console.log("In if",user.role)
            return true;
          } else if(isLoggedIn && user.role === ROLES.ADMIN){
            console.log("In 1st if",user.role)
            return true;
          }else if(isLoggedIn && user.role === ROLES.SUPER_ADMIN){
            console.log("In 2nd if",user.role)
            return true;
          }else if(isLoggedIn && user.role === ROLES.USER){
            console.log("In 2nd if",user.role)
            return true;
          }else{
            console.log('here',this.router.url)
            removeUserToken();
            this.router.navigate(['login']);
          }
        })
      );
    }
}
