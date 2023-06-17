import { Injectable } from '@angular/core';
import { ajax } from 'rxjs/ajax';
import { environment } from '@environments/environment';
import { SendPaymentInterface } from '@root/modules/accounts/interfaces/send-payment.interface';
import { errorCheck } from '@root/utils/error-check';
import { map } from 'rxjs/operators';
import { getUserToken } from '@root/helpers/tokenStorage';

@Injectable({
  providedIn: 'root'
})
export class SendPaymentService {

  sendPayment(details: SendPaymentInterface) {
    const token: string = getUserToken();
    return ajax({
      url: environment.API_URL + '/api/stellar/payment/stellar',
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(details),
      crossDomain: true,
      createXHR: function () {
        return new XMLHttpRequest();
      }
    })
      .pipe(
        map(res => errorCheck(res.response)),
        map(
          res => res.result,
          err => { throw err }
        )
      )
  }


  constructor() { }
}
