import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { exhaustMap, map, catchError, switchMap} from 'rxjs/operators';
import { ProfileActionTypes,UpdateProfile, UpdateProfileSuccess, UpdateProfileFailure } from '../actions/profile.actions';
import { of } from 'rxjs';
import { UpdateUserService } from "@root/modules/profile/services/update-user.service";

@Injectable()
export class ProfileEffects {

    @Effect()
    update$ = this.actions$.pipe(
        ofType<UpdateProfile>(ProfileActionTypes.UpdateProfile),
        exhaustMap(action =>
            this.service.updateUser(action.payload).pipe(
                switchMap(result => [
                    new UpdateProfileSuccess(result)
                ]),
                catchError(error => of(new UpdateProfileFailure(error)))
            )
        )
    );

  constructor(private actions$: Actions, private service: UpdateUserService) {}

}
