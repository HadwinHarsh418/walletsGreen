import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { exhaustMap, switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

import { SendPayment, SendPaymentSuccess, SendPaymentError, SendPaymentActionTypes } from '@modules/payee/actions/send-payment.actions'
import { SendPaymentService } from '@root/modules/payee/service/send-payment.service';


@Injectable()
export class SendPaymentEffects {


  @Effect()
  login$ = this.actions$.pipe(

      ofType<SendPayment>(SendPaymentActionTypes.SendPayment),

      exhaustMap(action =>
          this.service.sendPayment(action.payload).pipe(
              map(result => new SendPaymentSuccess(result)),
              catchError(error => of(new SendPaymentError(error)))
          )
      )
      
  );

  constructor(private actions$: Actions, private service: SendPaymentService) {}
}
