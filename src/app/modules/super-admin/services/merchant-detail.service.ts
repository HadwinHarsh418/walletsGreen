import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { errorCheck } from '@root/utils/error-check';
import { map } from 'rxjs/operators';
import { HttpService } from '@services/http.service';

@Injectable({
  providedIn: 'root'
})
export class MerchantDetailService {

  constructor(
    protected http: HttpService
  ) {}

  getMerchantDetail(params) {
    // we will use HttpClient module instead of rxjs/ajax
    // to use angular http interceptor for auth token.
    return this.http.get(`${environment.API_URL}/api/merchants`, params)
      .pipe(
        map(res => errorCheck(res)),
        map(
        res => res.result,
        error => { throw error; }
        )
      );
  }

  deactivateMerchant(params) {
    console.log(params)
    // we will use HttpClient module instead of rxjs/ajax
    // to use angular http interceptor for auth token.
    return this.http.delete(`${environment.API_URL}/api/merchants/deactivateMercahnt/${params.id}`)
      .pipe(
        map(res => errorCheck(res)),
        map(
        res => res.result,
        error => { throw error; }
        )
      );
  }

  getMerchantStatistics() {
    return this.http.get(`${environment.API_URL}/api/merchants/statistics`)
      .pipe(
        map(res => errorCheck(res)),
        map(
          res => res.result,
          error => { throw error; }
        )
      );
  }
}
