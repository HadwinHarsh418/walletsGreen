import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Store, select } from '@ngrx/store';
import * as loginReducers from '../../reducers';
import { ResetPassword } from '../../actions/reset.actions';
import { EdexValidators } from '@root/utils/edex-validators';

@Component({
    selector: 'edex-password-reset',
    templateUrl: './password-reset.component.html',
    styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

    public hide = true;

    public resetPending$ = this.store.pipe(select(loginReducers.resetPending));
    public resetSuccess$ = this.store.pipe(select(loginReducers.resetSuccess));
    public resetError$ = this.store.pipe(select(loginReducers.resetError));

    public formGroup: FormGroup;
    public password = new FormControl('', [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]);
    public passwordConfirm = new FormControl('', [CustomValidators.equalTo(this.password), EdexValidators.alsoValid(this.password)]);

    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private store: Store<loginReducers.State>
    ) {
        this.formGroup = this.fb.group({
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
