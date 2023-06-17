import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as signupActions from '@modules/login/actions/signup.actions';
import * as loginReducers from '@modules/login/reducers';
import { select, Store } from '@ngrx/store';
import { CustomValidators } from 'ng2-validation';

export interface CompanyType {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'edex-register-merchant',
    templateUrl: './register-merchant.component.html',
    styleUrls: ['./register-merchant.component.scss']
})
export class RegisterMerchantComponent implements OnInit {

    public signupFormGroup: FormGroup;
    public userSignupPassword = new FormControl('', [
        Validators.required,
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
    ]);
    public signupPasswordConfirm = new FormControl('', CustomValidators.equalTo(this.userSignupPassword));

    public signupSubmitted = false;

    public signupPending$ = this.store.pipe(select(loginReducers.getSignupPending));
    public signupSuccess$ = this.store.pipe(select(loginReducers.getSignupSuccess));
    public signupError$ = this.store.pipe(select(loginReducers.getSignupError));
    public signupUser$ = this.store.pipe(select(loginReducers.getSignupUser));

    constructor(
        private store: Store<loginReducers.State>,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.signupFormGroup = this.fb.group({
            signupContactName: [''],
            signupCompanyName: [''],
           // signupPhoneNumberSMS: [''],
            signupPhoneNumberCall: [''],
            offerCode: [''],
            //einNumber: [''],
            signupEmail: ['', [Validators.required, CustomValidators.email]],
            signupPassword: this.userSignupPassword,
            signupContactPermission: ['', []]
        });

        this.signupFormGroup.valueChanges.subscribe(changes => {
            this.signupSubmitted = false;
        });
    }

    submit() {
        this.signupSubmitted = true;
        window.console.log(this.signupFormGroup.value);
        if (this.signupFormGroup.valid && this.signupPasswordConfirm.valid) {
            this.store.dispatch(new signupActions.CreatePendingMerchant(this.signupFormGroup.value));
        }
    }

    controlInvalid(formGroup: FormGroup, controlName: string, submitted: boolean) {
        return (formGroup.controls[controlName].invalid && submitted);
    }

    getErrorPassword() {
        return this.signupFormGroup.get('signupPassword').hasError('pattern')
          ? 'Password must contain 8 Characters: 1 Uppercase, 1 Lowercase, 1 Number and 1 Special Character'
          : this.signupFormGroup.get('signupPassword').hasError('required')
            ? 'Not a valid password'
            : '';
    }

    getErrorEmail() {
        return this.signupFormGroup.get('signupEmail').hasError('email') ? 'You must enter a valid email address' :
            this.signupFormGroup.get('signupEmail').hasError('required') ? 'Not a valid email' :
                '';
    }
}
