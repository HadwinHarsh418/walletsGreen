import { Injectable } from "@angular/core";
import { environment } from '@environments/environment';
import { ajax } from 'rxjs/ajax';
import { errorCheck } from '@root/utils/error-check';
import { map } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class SignupService {
    constructor() {}

    signup(user: any) {
        return ajax({
            url: environment.API_URL + '/api/user/new',
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user),
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

    createPendingMerchant(user: any) {
        return ajax({
            url: environment.API_ADMIN_URL + '/api/merchants/pending/register',
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Headers':'Content-Type',
                'Access-Control-Allow-Methods':'*'
           },
            body: JSON.stringify(user),
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
