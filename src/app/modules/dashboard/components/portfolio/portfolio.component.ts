import { Component, OnInit } from '@angular/core';
import { StellarHistoryService } from '@root/services/stellar-history.service';
import * as loginReducers from '@modules/login/reducers';
import { Store, select } from '@ngrx/store';
import { getBalance } from '@root/utils/stellar';
import { Server } from 'stellar-sdk';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AdminApiService } from '@root/services/admin-api.service';
import { AccountId } from '@root/interfaces/stellar-account.interface';

@Component({
  selector: 'edex-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  public user$ = this.store.pipe(select(loginReducers.getUser));

  public userType = ''
  public accountId = ''
  public rollingReserveID: string
  public balances = [];
  public rrBalances = [];
  public currencySymbol = '';
  public totalBal = 0;
  public availableBal = 0;
  public rrTotalBal = 0;
  public rrToggle = false;
  public currencyToggle = 'USD'

  constructor(
    private stellarHistory: StellarHistoryService,
    private store: Store<loginReducers.State>,
    private http: HttpClient,
    private adminAPI: AdminApiService) { }

  ngOnInit() {
    this.user$.subscribe(user => {
      if(user){
        console.log(user,"user");
        if (user.publicKey && user.role) {
          this.accountId = user.publicKey;
          this.userType = user.role;
          if(this.userType){

            console.log(this.userType, this.accountId );
          }
          this.getAccountEdexBalances(this.accountId);
          if (this.userType === "Merchant"){
            this.getRollingReserveAccount(this.accountId);
          }
        }
      }
      
    })
  }

  getRollingReserveAccount(primaryAccountID: string){
    this.adminAPI.getRollingReserveAccountID(primaryAccountID).subscribe((res: any) =>{
      if(res.result.rows[0].rolling_reserve_account_id){
      this.rollingReserveID = res.result.rows[0].rolling_reserve_account_id;
      this.getRollingReserveAccountEdexBalances(this.rollingReserveID);
      return this.rollingReserveID.toString();
      }else{
        return ;
      }
    });
  }

  getRollingReserveAccountEdexBalances(rollingReserveID: string) {
    this.stellarHistory.getAccount(rollingReserveID)
      .subscribe(res => {
        let rollingReserveAccount = res as Server.AccountResponse;
        this.rrBalances = rollingReserveAccount['balances'].filter(b => b.asset_type !== 'native');

        // const ecpe = getBalance(rollingReserveAccount, 'ECPE');
        // const ecpu = getBalance(rollingReserveAccount, 'ECPU');
        const icet = getBalance(rollingReserveAccount, 'ICE');

        // if (this.currencyToggle === 'EUR') {
        //   this.rrTotalBal = parseFloat(ecpe) + (parseFloat(ecps) * (1.11)) + (parseFloat(ecpu) * (0.90));
        // }
        if (this.currencyToggle === 'USD') {
          this.rrTotalBal = (parseFloat(icet) * 3);
        }
        // if (this.currencyToggle === 'GBP') {
        //   this.rrTotalBal = (parseFloat(ecpe) * (0.90)) + parseFloat(ecps) + (parseFloat(ecpu) * (0.81));
        // }
      },
      err => {
        console.error('could not load balances')
      })
  }

  getAccountEdexBalances(accountId: string) {
    this.stellarHistory.getAccount(accountId)
      .subscribe(res => {
        let account = res;
        this.balances = account['balances'].filter(b => b.asset_type !== 'native');
        //
        // const ecpe = getBalance(account, 'ECPE');
        // const ecpu = getBalance(account, 'ECPU');
        const icet = getBalance(account, 'ICE');

        // if (this.currencyToggle === 'EUR') {
        //   this.totalBal = (parseFloat(icet) + parseFloat(icet)  + parseFloat(icet)) - ;
        // }
        if (this.currencyToggle === 'USD') {
            this.totalBal = (parseFloat(icet));
            this.availableBal = ( this.totalBal * (100 - 2.5) / 100);
        }
        // if (this.currencyToggle === 'GBP') {
        //   this.totalBal = (parseFloat(ecpe) * (0.90)) + parseFloat(ecps) + (parseFloat(ecpu) * (0.81))
        // }
      },
      err => {
        console.error('could not load balances')
      })
  }

  toggleCurrency(currency: string) {
    this.currencyToggle = currency;
    this.getAccountEdexBalances(this.accountId);
    if (this.userType == "merchant"){
      this.getRollingReserveAccount(this.accountId);
    }
  }

  toggleRRBalancesDisplay() {
    if(this.rrToggle == false) {
      return this.rrToggle = true;
    } else {
      return this.rrToggle = false;
    }
  }
}
