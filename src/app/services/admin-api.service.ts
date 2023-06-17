import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountId } from '@interfaces/stellar-account.interface';


@Injectable({
  providedIn: 'root'
})
export class AdminApiService {

  constructor(private httpClient: HttpClient) { }


  public getRollingReserveAccountID(primaryAccountID: string){
    return this.httpClient.get<AccountId>(`https://edexpay.net/api/user/get-rolling-reserve/${primaryAccountID}`)
  }
}
