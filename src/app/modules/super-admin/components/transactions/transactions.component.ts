import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StellarHistoryService } from '@services/stellar-history.service';
import _ from 'lodash';
import { select, Store } from '@ngrx/store';
import * as loginReducers from '@modules/login/reducers';
import { environment } from '@environments/environment';
import { MerchantDetailService } from '@root/modules/profile/services/merchant-detail.service';
import { getBalance } from '@root/utils/stellar';
import { HttpService } from "@root/services/http.service";

@Component({
    selector: 'edex-transactions',
    templateUrl: './transactions.component.html',
    styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
    public user$ = this.store.pipe(select(loginReducers.getUser));

    public filterOptions = [
        { label: 'All', value: '' },
        { label: 'Filter', value: 'filter-value' }
    ];

    public accountBalances = [];

    merchantId: string;

    public search = '';
    public filter1 = '';
    public poyntTransactions =[];
    public filter2 = '';
    public data = [];
    public limit = 5;
    public user;
    public totalDocs;
    debouncedFilter;

    constructor(
        private route: ActivatedRoute,
        private stellarHistory: StellarHistoryService,
        private merchantDetail: MerchantDetailService,
        private store: Store<loginReducers.State>,
        private httpService: HttpService
    ) {
        this.debouncedFilter = _.debounce(this.applyFilter.bind(this), 500);
    }

    async ngOnInit() {
        // this.user$.subscribe(user => {
        //     if (user['publicKey']) {
        //         this.getAccountOperations(user['publicKey']);
        //         this.merchantId = user['publicKey'];
        //     }
        // });
        // this.route.params.subscribe(params => {
        //     this.getAccountOperations(params['accountId']);
        //     this.merchantId = params['accountId'];
        // });
        var url = environment.API_URL + "/api/transactions/?limit="+this.limit;
        // this.http.post<any>(url, {}).subscribe((data) => {
        //     console.log(data);
        // });
        // console.log("In details", this.route.params);
        this.httpService.get(url).subscribe((data) => {
            this.poyntTransactions.push(data);
            console.log("", this.poyntTransactions[0]);
            this.user=this.poyntTransactions[0].user;
            this.data = this.poyntTransactions[0].data;
            this.totalDocs = this.poyntTransactions[0].totalDocs;
            console.log("here 71",this.data, this.user)
        });
        const merchants = environment.merchants_ids;
        console.log('merchants', merchants)
        for (let merchantId of merchants) {
            console.log("merchantId", merchantId)
            this.merchantDetail.getMerchantDetail(merchantId)
                .subscribe(res => {
                    console.log("transaction info",res);
                    if(res != null){
                        const contactName = res.merchant.contactName;
                        const publicKey = res.merchant.publicKey;
                        console.log(contactName, publicKey)
                        this.getAccountBalance(merchantId, contactName, publicKey);
                    }
                    },
                    err => {
                        console.log(err)
                        console.error('Couldn\'t load merchant detail');
                    });
        }
    }

    applyFilter() {
        console.log('search: ', this.search);
        console.log('filter1: ', this.filter1);
        console.log('filter2: ', this.filter1);

    }

     getAccountBalance(merchantId: string, contactName: string, accountId: string) {
        console.log(merchantId, accountId, contactName)
         this.stellarHistory.getAccount(accountId)
            .subscribe(async res => {
                console.log(res)
                    const account = res;
                    const icet = await getBalance(account);
                    console.log(icet)
                    this.accountBalances.push({
                        publicKey: accountId,
                        id: merchantId,
                        name: contactName,
                        amount: (parseFloat(icet))
                    });
                    console.log("this.accountBalances",this.accountBalances)
                    this.sortAccountBalances();
                },
                err => {
                    console.log(err)
                    console.error('could not load balances');
                });
    }

    clearFilter() {
        this.search = '';
        this.filter1 = '';
        this.filter2 = '';
        this.applyFilter();
    }

    sortAccountBalances() {
        return this.accountBalances.sort((a, b) => (a.amount < b.amount) ? 1 : ((b.amount < a.amount) ? -1 : 0));
    }

    onPageChange(values: any) {
        console.log('***', values);
        this.limit = values.pageSize;
        var url = `${environment.API_URL}/api/transactions/?limit=${values.pageSize}&page=${values.pageIndex+1}`;
        // this.http.post<any>(url, {}).subscribe((data) => {
        //     console.log(data);
        // });
        // console.log("In details", this.route.params);
        this.httpService.get(url).subscribe((data) => {
            this.poyntTransactions=[];
            this.poyntTransactions.push(data);
            console.log("", this.poyntTransactions[0]);
            this.data = this.poyntTransactions[0].data;
            this.totalDocs = this.poyntTransactions[0].totalDocs;
        });
    }
}
