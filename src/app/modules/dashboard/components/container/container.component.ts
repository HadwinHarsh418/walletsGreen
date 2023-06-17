import { Component, OnInit } from '@angular/core';
import * as loginReducers from "@modules/login/reducers";
import { Store, select } from "@ngrx/store";
@Component({
  selector: 'edex-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  public user$ = this.store.pipe(select(loginReducers.getUser));
  currentUserPaymentProcessor = ''
  payrixTotal:number = 0;
  constructor(
    private store: Store<loginReducers.State>,
  ) { }

  ngOnInit() {
    this.user$.subscribe((user) => {
      if(user && user.paymentProcessor) {
        this.currentUserPaymentProcessor = user.paymentProcessor;
      }
    });
  }

  savePayrixTotal(ev:any) {
    this.payrixTotal = ev && ev.total || 0;
  } 

}
