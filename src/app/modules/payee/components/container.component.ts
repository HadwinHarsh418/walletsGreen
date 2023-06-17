import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import * as loginReducers from "@modules/login/reducers";
import { select, Store } from "@ngrx/store";
import { Payee } from "@root/interfaces/payee.interface";
import * as rootReducers from "@root/reducers";
import { Observable, Subject } from "rxjs";
import { filter, map } from "rxjs/operators";
import { NewPayeeDialogueComponent } from "./new-payee-dialogue/new-payee-dialogue.component";

@Component({
    selector: "acc-container",
    templateUrl: "./container.component.html",
    styleUrls: ["./container.component.scss"]
})
export class ContainerComponent implements OnInit {

    private user$ = this.store.pipe(select(loginReducers.getUser));
    public contacts$: Observable<any> = null;
    public payeesList = [];

    public selectedPayee$: Subject<Payee> = new Subject();

    constructor(
        public dialog: MatDialog,
        private store: Store<rootReducers.State>
    ) { }

    ngOnInit() {
        console.log('here');
        this.user$.subscribe(user => {
            if(user){
                    
                                this.payeesList=user.contacts;
                                console.log(this.payeesList,"this.payeesList");
                            }
            
          })
    //  this.user$.pipe(
    //         filter(user => user != null),
    //         map(user =>{
    //             console.log(user);
    //             if(user){
                    
    //                 this.payeesList=user.contacts;
    //                 console.log(this.payeesList,"this.payeesList");
    //             }
                
    //         }
    //         )
    //     );
    }

    selectedPayee(payee: Payee) {
        return this.selectedPayee$.next(payee)
    }

    newPayee() {
        const dialogRef = this.dialog.open(NewPayeeDialogueComponent);
    }

}
