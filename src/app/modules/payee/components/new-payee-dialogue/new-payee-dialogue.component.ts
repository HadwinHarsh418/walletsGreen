import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Store, select } from "@ngrx/store";
import * as payeeReducers from '@modules/payee/reducers';
import { NewPayee } from '../../actions/new-payee.actions';
import * as loginReducers from '@modules/login/reducers';
import { EdexValidators } from "@root/utils/edex-validators";


@Component({
    selector: "acc-new-payee-dialogue",
    templateUrl: "./new-payee-dialogue.component.html",
    styleUrls: ["./new-payee-dialogue.component.scss"]
})
export class NewPayeeDialogueComponent implements OnInit {


    public user$ = this.store.pipe(select(loginReducers.getUser));
    public addressConfirm = new FormControl('', [], [EdexValidators.notUsersPublicKey(this.user$)]);

    public success$ = this.store.pipe(select(payeeReducers.getNewPayeeSuccess));
    public pending$ = this.store.pipe(select(payeeReducers.getNewPayeePending));
    public error$ = this.store.pipe(select(payeeReducers.getNewPayeeError));

    public formGroup: FormGroup;

    constructor(
        private fb: FormBuilder,
        private store: Store<payeeReducers.State>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<NewPayeeDialogueComponent>
    ) { }

    ngOnInit() {
        this.formGroup = this.fb.group({
            name: [''],
            address: [''],
            phone: [''],
            stellarPublicKey:['']
        })

        this.formGroup.valueChanges.subscribe(c => {
            // console.log(this.formGroup)
        })
    }

    submit() {
        if (this.formGroup.valid) {
            this.store.dispatch(new NewPayee(this.formGroup.value))
        }
    }

    cancel() {
        this.dialogRef.close()
    }

}
