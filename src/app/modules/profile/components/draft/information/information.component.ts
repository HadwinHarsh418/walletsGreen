import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as loginReducers from '@modules/login/reducers';
import * as profileReducers from '../../../reducers/';
import { select, Store } from '@ngrx/store';
import * as Countries from '@modules/login/components/countries';
import { resize } from '@root/utils/resize';
import { UpdateMerchantDetail, UpdateMerchantDetailSuccess } from '@modules/profile/actions/merchant-detail.actions';
import { Subscription } from 'rxjs';
import * as merchantReducers from '@modules/profile/reducers';
import { MerchantDetailService } from '@modules/profile/services/merchant-detail.service';
import { MessengerService } from '@modules/messenger/messenger.service';
import { IMerchantComment } from '@interfaces/merchant-comment.interface';
import { AddCommentDialogComponent } from '@modules/profile/components/draft/add-comment-dialog/add-comment-dialog.component';
import { MERCHANT_COMMENT_TYPE } from '@root/resources/enums/merchant-comment-types.enum';
import { MatDialog } from '@angular/material';
import { isSetInput } from '@modules/login/services/utils';
import { isDefined } from '@angular/compiler/src/util';

@Component({
  selector: 'edex-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit, OnDestroy {
  public user$ = this.store.pipe(select(loginReducers.getUser));

  private merchantDetailSub: Subscription;
  public registrationFormGroup: FormGroup;

  public merchantDetail$ = this.store.pipe(select(merchantReducers.getMerchantDetailCollection));
  public comments: IMerchantComment[] = [];
  public status = '';

  @Input() userId: string;

  public countries = Countries.slim_2;

  public smallScreen = false;

  public co = null;
  public submitted = false;
  public success$ = this.store.pipe(select(profileReducers.getProfileCollection));
  public pending$ = this.store.pipe(select(profileReducers.getProfilePending));
  public error$ = this.store.pipe(select(profileReducers.getProfileError));

  constructor(
    private store: Store<loginReducers.State>,
    private merchantApiService: MerchantDetailService,
    private msgr: MessengerService,
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.registrationFormGroup = this.fb.group({
      email: [''],
      firstname: [''],
      lastname: [''],
      signupPhoneNumberCall: [''],
      signupPhoneNumberSMS: [''],
      country: [''],
      postalCode: ['']
    });

    this.user$.subscribe(user => {
      if (user != null) {
        const {email} = user;
        this.registrationFormGroup.patchValue({email});
      }
    });

    this.merchantDetailSub = this.merchantDetail$.subscribe(merchantDetail => {
      if (merchantDetail) {
        const {
          merchant, firstname, lastname,  country,
          countryCode, postalCode, personalInfoStatus
        } = merchantDetail;
        const { phoneNumberCall, phoneNumberSMS} = merchantDetail.merchant;
        console.log(merchant)
        this.status = personalInfoStatus;
        let countryObj;
        if(country){
          countryObj =  this.countries.find(i => i.name === country);
        }else{
          countryObj ="";
        } 
       
        this.user$.subscribe((user)=>{
          if(user){
            if(user.role != 'Merchant'){
              this.registrationFormGroup.patchValue({
                email: '', 
                firstname:'', 
                lastname:'', 
                signupPhoneNumberCall:'', 
                signupPhoneNumberSMS:'', country: '',
                countryCode:'', 
                postalCode:'', 
              });
              this.registrationFormGroup.patchValue({
                email: merchant.email, firstname, lastname, signupPhoneNumberCall:phoneNumberCall, signupPhoneNumberSMS:phoneNumberSMS, country: countryObj,
                countryCode, postalCode
              });
            }
          }
        })
        this.registrationFormGroup.patchValue({
          email: merchant.email, 
          firstname :isSetInput(this.registrationFormGroup.get('firstname'), firstname), 
          lastname:isSetInput(this.registrationFormGroup.get('lastname'), lastname), 
          signupPhoneNumberCall:isSetInput(this.registrationFormGroup.get('signupPhoneNumberCall'), phoneNumberCall), 
          signupPhoneNumberSMS:isSetInput(this.registrationFormGroup.get('signupPhoneNumberSMS'), phoneNumberSMS), 
          country: countryObj,
          countryCode, 
          postalCode:isSetInput(this.registrationFormGroup.get('postalCode'), postalCode), 
        });

        if (merchantDetail.personalInfoComments) {
          this.comments = merchantDetail.personalInfoComments;
        }
        this.submitted = isDefined(merchant.email)|| isDefined(firstname)|| isDefined(lastname)|| isDefined(phoneNumberCall) || isDefined(phoneNumberSMS)||isDefined(postalCode);
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  listenResize() {
    this.smallScreen = resize('sm') || resize('xs') || resize('md');
  }


  /* fn to compare countries for mat-select */
  compareCountry = (c1, c2) => c1.name === c2.name;


  save() {
    this.store.dispatch(new UpdateMerchantDetail({
      userId: this.userId,
      merchantDetail: {
        firstname: this.registrationFormGroup.controls['firstname'].value,
        lastname: this.registrationFormGroup.controls['lastname'].value,
        phoneNumberCall: this.registrationFormGroup.controls['signupPhoneNumberCall'].value,
        phoneNumberSMS: this.registrationFormGroup.controls['signupPhoneNumberCall'].value,
        country: this.registrationFormGroup.controls['country'].value.name || '',
        countryCode: this.registrationFormGroup.controls['country'].value.alpha_2 || '',
        postalCode: this.registrationFormGroup.controls['postalCode'].value ||'',
        sectionField: 'personalInfoStatus',
      }
    }));
  }

  approveSection() {
    this.merchantApiService.approveSection(this.userId, 'personalInfoStatus', true)
      .subscribe(
        (res) => {
          this.msgr.message('This section is approved successfully.');
          this.store.dispatch(new UpdateMerchantDetailSuccess(res));
        },
        (err) => {
          this.msgr.error(err.message);
        }
      );
  }

  rejectSection() {
    this.merchantApiService.approveSection(this.userId, 'personalInfoStatus', false)
      .subscribe(
        (res) => {
          this.msgr.message('This section is rejected successfully.');
          this.store.dispatch(new UpdateMerchantDetailSuccess(res));
        },
        (err) => {
          this.msgr.error(err.message);
        }
      );
  }

  openDialog(): void {
    this.dialog.open(AddCommentDialogComponent, {
      data: {
        merchantId: this.userId,
        commentType: MERCHANT_COMMENT_TYPE.PERSONAL_INFO,
        comments: this.comments
      }
    });
  }

  ngOnDestroy(): void {
    if (this.merchantDetailSub) {
      this.merchantDetailSub.unsubscribe();
    }
  }
}
