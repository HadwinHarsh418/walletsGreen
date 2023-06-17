import { Injectable } from '@angular/core';
import { ajax } from 'rxjs/ajax';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { errorCheck } from '@root/utils/error-check';

@Injectable({
    providedIn: 'root'
})
export class TransactionsService {

    private currencySource = new BehaviorSubject('');
    private amountSource = new BehaviorSubject('');

    public currency = this.currencySource.asObservable();
    public amount = this.amountSource.asObservable();

    constructor(private http: HttpClient) { }

    setAmount(amount: string) {
        this.amountSource.next(amount);
    }

    setCurrency(currency: string) {
        this.currencySource.next(currency);
    }

    buy(details: any) {
        return this.http.put<any>(environment.API_URL + '/api/card/purchase', JSON.stringify(details));
    }

    buyRedirect(fields: any) {
        const fieldsValue = fields.result ? fields.result : [];
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'https://gateway.cardstream.com/hosted/';

        Object.entries(fieldsValue).forEach(
            ([key, value]) => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = value.toString();
                form.appendChild(input);
            }
        );

        document.body.appendChild(form);
        form.submit();
    }

    getTransaction(hash: string) {
        // return ajax({
        //     url: `https://edexpay.net/api/transactions/${hash}`,
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     crossDomain: true,
        //     createXHR: function () {
        //         return new XMLHttpRequest();
        //     }
        // })
        // .pipe(
        //     map(
        //         res => res.response,
        //         err => { throw err; }
        //     )
        // );
        return this.http.get(`${environment.API_URL}/api/transactions/${hash}`);
    }



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
  
     
  
    
  
     
  
      
  
      orderTopup(data):Observable<any>{
        return this.http.post(`${environment.API_URL}/api/seller/orderTopup/APG01D999TEST`,data)
      }
}
