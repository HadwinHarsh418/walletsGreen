import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { errorCheck } from '@root/utils/error-check';
import { map } from 'rxjs/operators';
import { HttpService } from '@services/http.service';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AdminApiService {

    constructor(
        protected http: HttpService
    ) {}

    getOrder(data:any) {
      // ?from_date =22110700000 &to_date =${new Date().getTime()}
      // https://v2-extapi.lunextelecom.com/pos/sellers/APG01D999TEST/trans/
      // {}, false, {
      //   headers:{
      //     'Authorization': 'Basic ' + btoa('APGITINCTESTING:apgit11022022')
      //   }
      // }
      let params = "?"
        if(data && data.From_Date && data.To_Date) {
          try{
            let frm = new Date(data.From_Date);
            let to = new Date(data.To_Date);
            if(frm && to) {
              params += `from_date=${this.getFormatedDate(frm)}&to_date=${this.getFormatedDate(to)}`;
            }
          } catch {

          }
        }
        console.log(params);
        return this.http.get(`${environment.API_URL}/api/seller/transactions${params}`)
      }

    getFormatedDate(date: Date) {
      let yr = `${date.getFullYear()}`.substring(2);
      let month = `${date.getMonth()+1 >= 10 ? date.getMonth()+1 : '0'+date.getMonth()+1}`;
      let dat= `${date.getDate() >= 10 ? date.getDate() : '0'+date.getDate()}`;
      return `${yr}${month}${dat}000000`;
    }

    getAdmins(params = {}) {
        // we will use HttpClient module instead of rxjs/ajax
        // to use angular http interceptor for auth token.
        return this.http.get(`${environment.API_URL}/api/merchants/admins`, params)
            .pipe(
                map(res => errorCheck(res)),
                map(
                    res => res.result,
                    error => { throw error; }
                )
            );
    }

    createAdmin(params) {
        // we will use HttpClient module instead of rxjs/ajax
        // to use angular http interceptor for auth token.
        return this.http.post(`${environment.API_URL}/api/merchants/admins`, params)
            .pipe(
                map(res => errorCheck(res)),
                map(
                    res => res.result,
                    error => { throw error; }
                )
            );
    }

    updateAdmin(id: string, params: any) {
        // we will use HttpClient module instead of rxjs/ajax
        // to use angular http interceptor for auth token.
        return this.http.put(`${environment.API_URL}/api/merchants/admins/${id}`, params)
          .pipe(
            map(res => errorCheck(res)),
            map(
              res => res.result,
              error => { throw error; }
            )
          );
    }

    deleteAdmin(id: string) {
        // we will use HttpClient module instead of rxjs/ajax
        // to use angular http interceptor for auth token.
        return this.http.delete(`${environment.API_URL}/api/merchants/admins/${id}`)
          .pipe(
            map(res => errorCheck(res)),
            map(
              res => res.result,
              error => { throw error; }
            )
          );
    }

    orderTopup(data):Observable<any>{
      return this.http.post(`${environment.API_URL}/api/seller/orderTopup/APG01D999TEST`,data)
    }
}
