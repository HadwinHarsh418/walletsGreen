import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { errorCheck } from '@root/utils/error-check';
import { HttpService } from '@services/http.service';
import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UpdateUserService {

    constructor(
        private http: HttpService,
    ) { }


    updateUser(details: any) {
        return ajax({
            url: environment.API_URL + '/api/user/update/user',
            method: 'PUT',
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

    updateApiKey(userId: string) {
        return this.http.put(`${environment.API_URL}/api/merchants/${userId}/update-api-key`, {})
            .pipe(
                map(res => errorCheck(res)),
                map(
                    res => res.result,
                    error => { throw error; }
                )
            );
    }

    updateSecretKey(userId: string) {
        return this.http.put(`${environment.API_URL}/api/merchants/${userId}/update-secret-key`, {})
            .pipe(
                map(res => errorCheck(res)),
                map(
                    res => res.result,
                    error => { throw error; }
                )
            );
    }

}
