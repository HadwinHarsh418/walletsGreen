import { Component, OnInit, HostListener } from "@angular/core";
import { StellarHistoryService } from "@root/services/stellar-history.service";
import { Store, select } from "@ngrx/store";
import * as merchantReducers from '@modules/profile/reducers';
import { GetMerchantDetail, UpdateMerchantDetailSuccess } from '@modules/profile/actions/merchant-detail.actions';
import * as rootReducers from '@root/reducers';
import * as loginReducers from '@modules/login/reducers';
import { map, tap, filter, switchMap } from "rxjs/operators";
import { merge, Observable } from "rxjs";
import { resize } from "@root/utils/resize";

@Component({
    selector: "acc-container",
    templateUrl: "./container.component.html",
    styleUrls: ["./container.component.scss"]
})
export class ContainerComponent implements OnInit {

    public accounts = [
        {
            currency: "USD",
            publicKey: 'GBPY2O44PLO74X5SMSCZLRO6KMW4373PKVKYO4ICUZTNQ4HPJE5XHUTD',
            balance: "2352.71"
        },
        {
            currency: "EUR",
            publicKey: 'GBPY2O44PLO74X5SMSCZLRO6KMW4373PKVKYO4ICUZTNQ4HPJE5XHUTD',
            balance: "754.52"
        },
        {
            currency: "GBP",
            publicKey: 'GBPY2O44PLO74X5SMSCZLRO6KMW4373PKVKYO4ICUZTNQ4HPJE5XHUTD',
            balance: "0.00"
        }
    ];

    public merchantDetail$ = this.store.pipe(select(merchantReducers.getMerchantDetailCollection));
    public merchantDetailInfo;
    public user$ = this.store.pipe(select(loginReducers.getUser));

    public accounts$: Observable<any> = null;

    public useDialogue = false;
    public shortHeight = false;
    public publicKey = '';
    public bankName = '';
    public bankAccountName = '';
    public bankProcessingStatement='';
    public qrCode = '';
    public userType = '';

    constructor(
        private stellar_history: StellarHistoryService,
        private store: Store<rootReducers.State>
    ) { }

    ngOnInit() {
        this.user$.subscribe((user) => {
            console.log(user, 'user');
            if (user) {
                this.publicKey = user.publicKey;
                this.store.dispatch(new GetMerchantDetail({ userId: user._id }));
                this.store.pipe(select(merchantReducers.getMerchantDetailCollection)).subscribe(
                    merchantDetail => {
                        if (merchantDetail) {
                            console.log(merchantDetail, "merchantDetail");
                            if(merchantDetail.merchant){
                                this.userType = merchantDetail.merchant.role;
                            }
                            this.bankName = merchantDetail.bankName;
                            this.qrCode = merchantDetail.qrCode;
                            this.bankAccountName = merchantDetail.bankAccountName;
                            this.bankProcessingStatement = merchantDetail.bankProcessingStatement;

                        }
                    }
                );
            }
        });

        this.accounts$ = this.user$.pipe(
            filter(user => (user.publicKey != null)),
            switchMap(user => this.stellar_history.getEdexBalances(user.publicKey))
        )
        // console.log(this.accounts$)
    }

    resize() {
        this.useDialogue = resize('sm') || resize('xs') || resize('md');
    }

    @HostListener('window:resize', ['$event'])
    listenResize() {
        this.resize();
    }
}
