import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {AdminApiService} from '@modules/super-admin/services/admin-api.service';
import {MessengerService} from '@modules/messenger/messenger.service';
import {IMerchant} from '@interfaces/merchant.interface';

export interface EditAdminDialogData {
  merchant?: IMerchant;
}

@Component({
  selector: 'edex-edit-admin-dialog',
  templateUrl: './edit-admin-dialog.component.html',
  styleUrls: ['./edit-admin-dialog.component.scss']
})
export class EditAdminDialogComponent implements OnInit {

  public hidePassword = true;
  public hidePasswordConfirm = true;

  public formGroup: FormGroup;
  public password = new FormControl('', [
    Validators.required,
    Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
  ]);
  public passwordConfirm = new FormControl('', CustomValidators.equalTo(this.password));

  constructor(
      private fb: FormBuilder,
      private adminApi: AdminApiService,
      private msgr: MessengerService,
      public dialogRef: MatDialogRef<EditAdminDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: EditAdminDialogData,
  ) { }

  ngOnInit() {
    if (!this.data.merchant) {
      this.formGroup = this.fb.group({
        signupContactName: ['', [Validators.required]],
        signupCompanyName: ['', [Validators.required]],
        signupPhoneNumberSMS: ['', [Validators.required]],
        signupPhoneNumberCall: ['', [Validators.required]],
        signupEmail: ['', [Validators.required, CustomValidators.email]],
        signupPassword: this.password,
        signupContactPermission: ['', []]
      });
    } else {
      this.formGroup = this.fb.group({
        signupContactName: [this.data.merchant.contactName, [Validators.required]],
        signupCompanyName: [this.data.merchant.companyName, [Validators.required]],
        signupPhoneNumberSMS: [this.data.merchant.phoneNumberSMS, [Validators.required]],
        signupPhoneNumberCall: [this.data.merchant.phoneNumberCall, [Validators.required]],
        signupEmail: [this.data.merchant.email, [Validators.required, CustomValidators.email]],
        signupPassword: this.password,
        signupContactPermission: ['', []]
      });
    }
  }

  handleClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.formGroup.valid && this.passwordConfirm.valid) {
      if (!this.data.merchant) {
        this.adminApi.createAdmin(this.formGroup.value).subscribe(
          (res) => {
            this.msgr.message('Admin is created successfully');
            this.dialogRef.close(true);
          },
          (err) => {
            console.log(err, 'err')
            this.msgr.error(err.error.message || 'Failed to create admin.');
          }
        );
      } else {
        this.adminApi.updateAdmin(this.data.merchant._id, this.formGroup.value).subscribe(
          (res) => {
            this.msgr.message('Admin is updated successfully.');
            this.dialogRef.close(true);
          },
          (err) => {
            this.msgr.error(err.error.message || 'Failed to create admin.');
          }
        );
      }

    }
  }

  getErrorPassword() {
    return this.formGroup.get('signupPassword').hasError('pattern')
        ? 'Password must contain 8 Characters: 1 Uppercase, 1 Lowercase, 1 Number and 1 Special Character'
        : this.formGroup.get('signupPassword').hasError('required')
            ? 'Not a valid password'
            : '';
  }

  getErrorEmail() {
    return this.formGroup.get('signupEmail').hasError('email') ? 'You must enter a valid email address' :
        this.formGroup.get('signupEmail').hasError('required') ? 'Not a valid email' :
            '';
  }
}
