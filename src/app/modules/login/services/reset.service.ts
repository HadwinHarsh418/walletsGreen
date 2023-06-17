import { Injectable } from '@angular/core';
import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';
import { errorCheck } from './utils';
import { environment } from '@environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ResetService {

    constructor() { }

    requestReset(details) {
        return ajax({
            url: environment.API_URL + '/api/session/request-password-reset',
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
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

    resetPassword(details){
        return ajax({
            url: environment.API_URL + '/api/session/password-reset',
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
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

}
