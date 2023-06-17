import { Injectable } from '@angular/core';
import { ajax } from 'rxjs/ajax';
import { environment } from '@environments/environment';
import { errorCheck } from '@root/modules/login/services/utils';
import { map } from 'rxjs/operators';
import { ExchangeCurrencyInterface } from '../interfaces/exchange-currency.interface';
import { getUserToken } from '@root/helpers/tokenStorage';

@Injectable({
  providedIn: 'root'
})
export class ExchangeCurrencyService {

  exchange(details: ExchangeCurrencyInterface) {
    const token: string = getUserToken();
    
    return ajax({
      url: environment.API_URL + '/api/stellar/exchange',
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
