import { Injectable } from "@angular/core";
import { environment } from '@environments/environment';
import { ajax } from 'rxjs/ajax';
import { errorCheck } from '@root/utils/error-check';
import { map } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class LogoutService {
    constructor() {}

    logout() {
        return ajax({
            url: environment.API_URL + '/api/session/logout',
            method: 'PUT',
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
