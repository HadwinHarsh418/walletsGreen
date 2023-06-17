import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Logout, LogoutSuccess, LogoutFailure, LogoutActionTypes} from "@modules/login/actions/logout.actions";
import { exhaustMap, map, catchError } from "rxjs/operators";
import { LogoutService } from "@modules/login/services/logout.service";
import { of } from "rxjs";
import { Router } from "@angular/router";
import { removeUserToken } from '@root/helpers/tokenStorage';

@Injectable()
export class LogoutEffects {

    @Effect()
    logout$ = this.actions$.pipe(
        ofType<Logout>(LogoutActionTypes.Logout),
        map(action => {
            removeUserToken();
            return new LogoutSuccess();
        })
    );

    @Effect({dispatch: false})
    redirect$ = this.actions$.pipe(
        ofType<LogoutSuccess>(LogoutActionTypes.LogoutSuccess),
        map(action => {
          this.router.navigate(['/login'])
        })
    );

    constructor(
        private actions$: Actions,
        private service: LogoutService,
        private router: Router
    ) {}
}
