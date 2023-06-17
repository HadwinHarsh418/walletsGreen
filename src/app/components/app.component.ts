import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSidenav } from '@angular/material';
import { ResetSendPayment } from '@modules/accounts/actions/send-payment.actions';
import * as accountsReducers from '@modules/accounts/reducers';
import * as loginActions from '@modules/login/actions/login.actions';
import * as logoutActions from '@modules/login/actions/logout.actions';
import * as loginReducers from '@modules/login/reducers';
import { select, Store } from '@ngrx/store';
import { SendDialogueComponent } from '@root/modules/accounts/components/send-dialogue/send-dialogue.component';
import * as fromRoot from '@root/reducers';
import { mergeAccountsWithStellarAccounts } from '@root/utils/stellar';
import { combineLatest, Subject } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { resize } from '@root/utils/resize';
import { HttpService } from '@services/http.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'edex-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', './floating-menu.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;
  public isExpanded = true;
  public hidesidebatr:boolean=false
  public user$ = this.store.pipe(select(loginReducers.getUser));
  public userIsLoggedIn$ = this.store.pipe(select(loginReducers.getIsLoggedIn));
  public accounts$ = this.store.pipe(select(accountsReducers.getStellarAccounts));
  public accountsSuccess$ = this.store.pipe(select(accountsReducers.getStellarAccountsSuccess));
  userActivity;
  userInactive: Subject<any> = new Subject();
  public hrfdata: string;
  hidesidebnow:boolean = false;

  constructor(
      private store: Store<loginReducers.State>,
      private rootStore: Store<fromRoot.State>,
      public dialog: MatDialog,
      private acc_store: Store<accountsReducers.State>,
      public http: HttpService,
      private router: Router,
      public _ActivatedRoute:ActivatedRoute
  ) {
    const Obj = this;
    this.listenResize();
    this.store.dispatch(new loginActions.RequestSession);
    this.setTimeout();
    this.userInactive.subscribe(function() {
      // console.log(localStorage.getItem('userToken'))
      if (localStorage.getItem('userToken') !== null) {
        console.log('user has been inactive for 5 minutes');
        Obj.logout();
      }
      /*
      1. Disable polling
      2. Logout the user
      */
    });
   
    this.router.events.subscribe(
      res => {
        if(res instanceof NavigationEnd) {
          this.hidesidebnow = res.url.indexOf('payrix-payment') > -1 || res.url.indexOf('payrix-payfield') > -1
        }
      }
    )
  }

  ngOnInit () {
    console.log('roooroorroo',this.router.url);
    console.log( 'plplplpl',window.location.href);
    this.hrfdata=window.location.href
    if(this.hrfdata=="http://localhost:4200/payrix-payment"){
      this.hidesidebatr=true
    }
    else{
      this.hidesidebatr=false
    }
    // this._ActivatedRoute.snapshot('')
    // Check if the user is logged in to start polling // TODO -> this will be checked in later
    if (localStorage.getItem('userToken') !== null) {
      // console.log("Inside App")
      // Start Polling
      const Obj = this;
      // setInterval(function() {
      //   // Obj.store.dispatch(new loginActions.LongPolling(this.loginEmailFormGroup.value))
      //   Obj.store.dispatch(
      //     new loginActions.LongPolling(localStorage.getItem('userToken'))
      //   );
      // }, 30000);
    }

    window.addEventListener('storage', (event) => {
      if (event.storageArea == localStorage) {
        const token = localStorage.getItem('userToken');
        if (token == undefined) {
          this.logout();
        } else {
          window.location.reload();
        }
      }
    }, false);
  }

  @HostListener('window:resize', ['$event'])
  listenResize() {
    this.isExpanded = !(resize('sm') || resize('xs'));
  }

  send() {
    this.accountsSuccess$.pipe(
      filter(res => res),
      switchMap(() => combineLatest(this.user$, this.accounts$))
    )
    .subscribe(res => {
      const accounts = mergeAccountsWithStellarAccounts(res[0].accounts, res[1]);
      const dialogRef = this.dialog.open(SendDialogueComponent, {
        data: accounts.find(i => i.info.name === 'Current Account'),
      });

      dialogRef.afterClosed().subscribe(result => {
        this.acc_store.dispatch(new ResetSendPayment());
      });
    })
    .unsubscribe();
  }

  logout() {
    this.rootStore.dispatch(new logoutActions.Logout);
  }

  setTimeout() {
    // this.userActivity = setTimeout(() => this.userInactive.next(undefined), 300000);
    // this.userActivity = setTimeout(() => this.userInactive.next(undefined), 300000);
  }

  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }
}
