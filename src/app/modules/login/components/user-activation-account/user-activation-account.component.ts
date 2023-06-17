import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroupDirective, NgForm } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { FormControl, Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Store, select } from '@ngrx/store';
import * as loginReducers from '../../reducers';
import { ResetPassword } from '../../actions/reset.actions';
import { EdexValidators } from '@root/utils/edex-validators';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'edex-user-activation-account',
  templateUrl: './user-activation-account.component.html',
  styleUrls: ['./user-activation-account.component.scss']
})
export class UserActivationAccountComponent implements OnInit {
 

  // matcher = new MyErrorStateMatcher();
  public hide = true;

  public resetPending$ = this.store.pipe(select(loginReducers.resetPending));
  public resetSuccess$ = this.store.pipe(select(loginReducers.resetSuccess));
  public resetError$ = this.store.pipe(select(loginReducers.resetError));

  public formGroup: FormGroup;
  public emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  public password = new FormControl('', [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]);
  public passwordConfirm = new FormControl('', [CustomValidators.equalTo(this.password), EdexValidators.alsoValid(this.password)]);


  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private store: Store<loginReducers.State>) { 
      this.formGroup = this.fb.group({
        email: this.emailFormControl,
        password: this.passwordConfirm,
        token: ['', [Validators.required]]
    })
    this.formGroup.valueChanges.subscribe(() => {
        console.log(this.formGroup)
    })
    }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if ('token' in params) {
          this.formGroup.get('token').setValue(params['token']);
      }
  })
  }

  submit() {
    this.store.dispatch(new ResetPassword(this.formGroup.value))
}

}
