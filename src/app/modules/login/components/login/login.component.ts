import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as loginActions from '@modules/login/actions/login.actions';
import * as loginReducers from '@modules/login/reducers';
import { select, Store } from '@ngrx/store';
import { CustomValidators } from 'ng2-validation';
import { Router } from '@angular/router';
import { ROLES } from '@root/resources/enums/role.enum';

@Component({
    selector: 'edex-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public hidePassword = true;

    public loginEmailPending$ = this.store.pipe(select(loginReducers.getLoginPending));
    public loginEmailError$ = this.store.pipe(select(loginReducers.getLoginError));
    public loginEmailUser$ = this.store.pipe(select(loginReducers.getUser));
    public loginEmailRole$ = this.store.pipe(select(loginReducers.getUserRole));

    public loginEmailFormGroup: FormGroup;
    public loginEmail = new FormControl('', [Validators.required, CustomValidators.email]);
    public loginEmailPassword = new FormControl('', [Validators.required, Validators.minLength(8)]);
    public loginSubmitted = false;

    public loginEmailIsLoggedIn$ = this.store.pipe(
        select(loginReducers.getIsLoggedIn)
    );

    constructor(
        private store: Store<loginReducers.State>,
        private router: Router,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
      this.loginEmailFormGroup = this.fb.group({
        email: this.loginEmail,
        password: this.loginEmailPassword
      });

      this.loginEmailFormGroup.valueChanges.subscribe(changes => {
        this.loginSubmitted = false;
      });

      // this.loginEmailIsLoggedIn$.subscribe(loggedIn => {
      //   if (loggedIn) {
      //     this.router.navigate(["/settings"]);
      //   }
      // });

      this.loginEmailRole$.subscribe(role => {
        if (role === ROLES.ADMIN || role === ROLES.SUPER_ADMIN) {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      });
    }

    login() {
      this.loginSubmitted = true;
      if (this.loginEmailFormGroup.valid) {
        this.store.dispatch(
          new loginActions.LoginEmail(this.loginEmailFormGroup.value)
        );
        // Check if the user is logged in to start polling
        // if (localStorage.getItem('userToken') !== 'null') {
          // Start Polling
          // let Obj = this;
          // setInterval(function() {
          //   // Obj.store.dispatch(new loginActions.LongPolling(this.loginEmailFormGroup.value))
          //   Obj.store.dispatch(
          //     new loginActions.LongPolling(localStorage.getItem('userToken'))
          //   );
          // }, 30000);
        // }
      }
    }
}
