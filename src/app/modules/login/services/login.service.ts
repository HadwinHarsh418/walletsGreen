import { Injectable } from "@angular/core";
import { environment } from '@environments/environment';
import { errorCheck } from '@root/utils/error-check';
import { ajax } from 'rxjs/ajax';
import { map } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: "root"
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(details: any) {
    return this.http.put(
      environment.API_URL + '/api/session/login/email', JSON.stringify(details)
    )
    .pipe(
      map(res => errorCheck(res)),
      map(
        res => res.result,
        err => { throw err; }
      )
    );
  }

  longPolling(details: any) {
    return this.http.get(environment.API_URL + '/api/session/longpoll')
    .pipe(
      map(res => errorCheck(res)),
      map(
        res => res,
        err => { throw err; }
      )
    );
  }

  session() {
    return this.http.get(environment.API_URL + '/api/session')
    .pipe(
      map(res => errorCheck(res)),
      map(
        res => res.result,
        err => { throw err; }
      )
    );
  }

  activateAccount(token: string) {
    return this.http.post(environment.API_URL + '/api/session/activate-account', { token })
      .pipe(
        map(res => errorCheck(res)),
        map(
          res => res.result,
          err => { throw err; }
        )
      );
  }

  resendActivationEmail(token: string) {
    return this.http.post(environment.API_URL + '/api/session/resend-activation-email', { token })
      .pipe(
        map(res => errorCheck(res)),
        map(
          res => res.result,
          err => { throw err; }
        )
      );
  }
}
