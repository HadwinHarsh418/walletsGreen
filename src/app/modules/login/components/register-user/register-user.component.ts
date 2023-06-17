import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as signupActions from '@modules/login/actions/signup.actions';
import * as Countries from "@modules/login/components/countries";
import * as loginReducers from '@modules/login/reducers';
import { DynamicScriptLoaderService } from '@root/services/dynamic-script-loader.service';
import { select, Store } from '@ngrx/store';
import { CustomValidators } from 'ng2-validation';

//uncomment if using dropdown for the Title instead of text input.
export interface Title {
    value: string;
    viewValue: string;
}

export interface Gender {
    value: string;
    viewValue: string;
}

@Component({
  selector: 'edex-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

    public picker = Date;
    public currentDate = Date.now();
    public startDate = new Date((this.currentDate - 568024668000 )); // -18 years in milliseconds

    hide = true;

    public countries = Countries.slim_2;

    public signupFormGroup: FormGroup;
    public signupDateOfBirth = new FormControl('', [Validators.required, CustomValidators.maxDate (this.currentDate - 568024668000)]);
    public signupPassword = new FormControl('', [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]);
    public signupPasswordConfirm = new FormControl('', CustomValidators.equalTo(this.signupPassword));
    public signupPin = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('[0-9]+')]);
    public signupPinConfirm = new FormControl('', CustomValidators.equalTo(this.signupPin));
    public signupSubmitted: boolean = false;

    public signupPending$ = this.store.pipe(select(loginReducers.getSignupPending));
    public signupSuccess$ = this.store.pipe(select(loginReducers.getSignupSuccess));
    public signupError$ = this.store.pipe(select(loginReducers.getSignupError));
    public signupUser$ = this.store.pipe(select(loginReducers.getSignupUser));

    //uncomment if using dropdown for the Title instead of text input.
    titles: Title[] = [
        {value: 'mr', viewValue: 'Mr'},
        {value: 'ms', viewValue: 'Ms'}
    ];

    genders: Gender[] = [
        {value: 'male', viewValue: 'Male'},
        {value: 'female', viewValue: 'Female'},
        {value: 'other', viewValue: 'Other'}
    ];

    constructor(
        private store: Store<loginReducers.State>,
        private fb: FormBuilder,
        private router: Router,
        private dynamicScriptLoader: DynamicScriptLoaderService
    ){}

    ngOnInit() {
        this.loadScripts();

        this.signupFormGroup = this.fb.group({
            title: ['', [Validators.required]],
            firstname: ['', [Validators.required]],
            lastname: ['', [Validators.required]],
            gender: ['', [Validators.required]],
            dateOfBirth: this.signupDateOfBirth,
            phone: ['', [Validators.required, Validators.pattern('\\+?[0-9]+')]],
            email: ['', [Validators.required, CustomValidators.email]],
            address1: ['', [Validators.required]],
            address2: [''],
            city: ['', [Validators.required]],
            state: ['', [Validators.required]],
            country: ['', [Validators.required]],
            postcode: ['', [Validators.required]],
            password: this.signupPassword,
            pin: this.signupPin,
            user_type: 'customer',
            ioBlackBox: ['']
        })

        this.signupFormGroup.valueChanges.subscribe(changes => {
            this.signupSubmitted = false
        })
    }

    private loadScripts() {
        this.dynamicScriptLoader.load('iovation-config', 'iovation-loader').then(data => {
            // Scripts Loaded Successfully
        }).catch(error => console.log(error));
    }

    signUp(ioBlackBox: string){
        this.signupFormGroup.get('ioBlackBox').setValue(ioBlackBox);
        this.signupSubmitted = true;
        if (this.signupFormGroup.valid && this.signupPasswordConfirm.valid && this.signupPinConfirm.valid){
            this.store.dispatch(new signupActions.Signup(this.signupFormGroup.value));
        }
    }

    controlInvalid(formGroup: FormGroup, controlName: string, submitted: boolean){
        return (formGroup.controls[controlName].invalid && submitted)
    }


    /* added by Ultan*/
    getErrorEmail(){
        return this.signupFormGroup.get('email').hasError('email') ? 'You must enter a valid email address':
        this.signupFormGroup.get('email').hasError('required') ? 'Not a valid email':
            '';
    }

    getErrorFirstName(){
        return this.signupFormGroup.get('firstname').hasError('required') ? 'You must enter a first name':
        '';
    }

    getErrorLastName(){
        return this.signupFormGroup.get('lastname').hasError('required') ? 'You must enter a last name':
            '';
    }

    getErrorPassword(){
        return this.signupFormGroup.get('password').hasError('pattern') ? 'Password must contain 8 Characters: 1 Uppercase, 1 Lowercase, 1 Number and 1 Special Character':
        this.signupFormGroup.get('password').hasError('required') ? 'Not a valid password':
            '';
    }

    getErrorDateOfBirth(){
        return this.signupFormGroup.get('dateOfBirth').hasError('maxDate') ? 'You must be over 18 years of age':
        this.signupFormGroup.get('dateOfBirth').hasError('required') ? 'Enter date of birth by clicking the Calendar Icon':
            '';
    }

    getErrorPin(){
        return this.signupFormGroup.get('pin').hasError('maxLength(6)') ? 'Pin must be 6 digits long':
        this.signupFormGroup.get('pin').hasError('required') ? 'Not a valid pin':
            '';
    }

    /* Added by John */
    getErrorPhone(){
        return this.signupFormGroup.get('phone').hasError('required') ? 'You must enter a phone number':
        this.signupFormGroup.get('phone').hasError('pattern') ? 'Phone number can contain only numbers or an optional preceding "+" sign ':
            '';
    }

    /* Added by John */
    getErrorTitle(){
        return this.signupFormGroup.get('title').hasError('required') ? 'You must enter a title' : ''
    }

    /* Added by John */
    getErrorPostcode(){
        return this.signupFormGroup.get('postcode').hasError('required') ? 'You must enter a postcode' : ''
    }

    getErrorTaxNumber(){
        return this.signupFormGroup.get('taxNumber').hasError('required') ? 'You must enter a tax number' : ''
    }

    /* Added by Chris */
    getErrorGender() {
        return this.signupFormGroup.get('gender').hasError('required') ? 'You must enter a gender' : ''
    }

    getErrorAddress() {
        return this.signupFormGroup.get('address1').hasError('required') ? 'You must enter an address' : ''
    }

    getErrorCity() {
        return this.signupFormGroup.get('city').hasError('required') ? 'You must enter a city' : ''
    }

    getErrorState() {
        return this.signupFormGroup.get('state').hasError('required') ? 'You must enter a state or province' : ''
    }
}
