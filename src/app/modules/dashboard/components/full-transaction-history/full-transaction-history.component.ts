import { Component, HostListener, OnInit } from "@angular/core";
import { environment } from "@environments/environment";
import { ActivatedRoute } from "@angular/router";
import { StellarHistoryService } from "@root/services/stellar-history.service";
import { HttpService } from "@root/services/http.service";
import * as loginReducers from "@modules/login/reducers";
import { select, Store } from "@ngrx/store";
import { checkHeight, resize } from "@root/utils/resize";
import { ROLES } from "@root/resources/enums/role.enum";

@Component({
    selector: "edex-full-transaction-history",
    templateUrl: "./full-transaction-history.component.html",
    styleUrls: ["./full-transaction-history.component.scss"],
})
export class FullTransactionHistoryComponent implements OnInit {
    public user$ = this.store.pipe(select(loginReducers.getUser));

    public accountId = "";
    public poyntTransactions = [];

    public operations = [];
    public isAdmin = false;

    public smallScreen = false;
    public shortHeight = false;

    constructor(
        private route: ActivatedRoute,
        private stellarHistory: StellarHistoryService,
        private httpService: HttpService,
        private store: Store<loginReducers.State>
    ) {
        this.smallScreen = resize("sm") || resize("xs") || resize("md");
        this.shortHeight = checkHeight();
    }

    ngOnInit() {
        
        this.user$.subscribe((user) => {
            if (user.role === ROLES.SUPER_ADMIN || user.role === ROLES.ADMIN) {
                this.isAdmin = true;
            }

            if (user["publicKey"]) {
                this.accountId = user["publicKey"];
            }
        });
        this.route.params.subscribe((params) => {
            this.getAccountOperations(params["accountId"]);
            this.getTransactions(params["accountId"]);
            this.accountId = params["accountId"];
        });
    }

    @HostListener("window:resize", ["$event"])
    listenResize() {
        this.smallScreen = resize("sm") || resize("xs") || resize("md");
        this.shortHeight = checkHeight();
    }
    getTransactions(accountId: string){
        console.log("HEY!!!!!! ", accountId);
        var url = environment.API_URL + "/api/transactions/poynt";
        // this.http.post<any>(url, {}).subscribe((data) => {
        //     console.log(data);
        // });
        this.httpService.post(url, {publicKey:accountId}).subscribe((data) => {
            this.poyntTransactions = data.data;
            console.log(this.poyntTransactions);
        });
    }


    getAccountOperations(accountId: string) {
        console.log("HEY!!!!!! ", accountId);
        this.stellarHistory
            .getAccountPaymentOperationsFull(accountId)
            .subscribe(
                (res) => {
                    this.operations = res;
                    res.forEach(function (value) {
                        // console.log("TO = "< value.to)
                    });
                },
                (err) => {
                    console.error("Couldn't load transactions!");
                }
            );
    }
}
