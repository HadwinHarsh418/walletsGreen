import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PayrixService {

  constructor(private _httpClient: HttpClient) { }

  post(model: any): Observable<any> {
    return this._httpClient.post(`${environment.API_URL}/api/seller/payment`,model);
  }

  saveTxn(data: any): Observable<any> {
    return this._httpClient.post(`${environment.API_URL}/api/seller/paymentDetails`,data);
  }

  stallerToken(data: any): Observable<any> {
    let dt:any= data;
    dt.total = parseFloat(dt.total) / 100;
    return this._httpClient.post(`${environment.API_URL}/api/transactions/transferfund`,dt);
  }

}
