import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { SendPaymentInterface } from '@root/modules/payee/interfaces/send-payment.interface';
import { errorCheck } from '@root/utils/error-check';
import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { getUserToken } from '@root/helpers/tokenStorage';

@Injectable({
    providedIn: 'root'
})
export class SendPaymentService {

    constructor(private http: HttpClient) { }

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

    newPayee(details: any) {
        return this.http.put(environment.API_URL + '/api/user/new/payee', JSON.stringify(details));
        // return ajax({
        //     url: environment.API_URL + '/api/user/new/payee',
        //     method: 'PUT',
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(details),
        //     crossDomain: true,
        //     createXHR: function () {
        //         return new XMLHttpRequest();
        //     }
        // })
        //     .pipe(
        //         map(res => errorCheck(res.response)),
        //         map(
        //             res => res.result,
        //             err => { throw err }
        //         )
        //     )
    }

}
