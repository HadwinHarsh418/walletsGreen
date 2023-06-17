import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { exhaustMap, catchError, switchMap} from 'rxjs/operators';
import { of } from 'rxjs';
import { MerchantDetailService } from '@modules/super-admin/services/merchant-detail.service';
import { MessengerService } from '@modules/messenger/messenger.service';

import {
  MerchantsActionTypes,
  GetAllMerchants,
  GetAllMerchantsSuccess,
  GetAllMerchantsFailure,
} from '@modules/super-admin/actions/merchants.actions';

@Injectable()

export class MerchantsEffects {

  @Effect()
  get$ = this.actions$.pipe(
    ofType<GetAllMerchants>(MerchantsActionTypes.GetAllMerchants),
    exhaustMap(action =>
      this.service.getMerchantDetail(action.payload).pipe(
        switchMap(result => {
          return [
            new GetAllMerchantsSuccess(result)
          ];
        }),
        catchError(error => {
          this.msgr.error(error);

          return of(new GetAllMerchantsFailure(error));
        })
      )
    )
  );

  constructor(
    private actions$: Actions,
    private service: MerchantDetailService,
    private msgr: MessengerService
  ) {
  }
}
