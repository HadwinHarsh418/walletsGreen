import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { RequestPasswordReset } from "@modules/login/actions/reset.actions";
import * as loginReducers from "@modules/login/reducers";
import { select, Store } from "@ngrx/store";
import { CustomValidators } from 'ng2-validation';

@Component({
    selector: 'edex-password-reset',
    templateUrl: './request-password-reset.component.html',
    styleUrls: ['./request-password-reset.component.scss']
})
export class RequestPasswordResetComponent implements OnInit {

    public resetPending$ = this.store.pipe(select(loginReducers.resetPending));
    public resetSuccess$ = this.store.pipe(select(loginReducers.resetSuccess));
    public resetError$ = this.store.pipe(select(loginReducers.resetError));

    public resetPasswordFormGroup: FormGroup;

    public submitted: boolean = false;

    constructor(
        private store: Store<loginReducers.State>,
        private fb: FormBuilder
    ) { }

    ngOnInit() {

        this.resetPasswordFormGroup = this.fb.group({
            email: ["", [Validators.required, CustomValidators.email]],
        });

        this.resetPasswordFormGroup.valueChanges.subscribe(changes => {
            this.submitted = false;
        });

    }

    submit() {
        this.submitted = true;
        if (this.resetPasswordFormGroup.valid) {
            this.store.dispatch(
                new RequestPasswordReset(this.resetPasswordFormGroup.value)
            );
        }
    }
}
