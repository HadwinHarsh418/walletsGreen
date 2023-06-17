import { Injectable } from '@angular/core';
import { ajax } from 'rxjs/ajax';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';
import { errorCheck } from '@root/utils/error-check';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor() { }

    lookup(publicKey: string) {

        return ajax({
            url: environment.API_URL + '/api/user/lookup',
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ publicKey: publicKey }),
            crossDomain: true,
            createXHR: function () {
                return new XMLHttpRequest();
            }
        })
            .pipe(
                map(res => errorCheck(res.response)),
                map(
                    res => res.result,
                    err => { throw err; }
                )
            )
    }

}
