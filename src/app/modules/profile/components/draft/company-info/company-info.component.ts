import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as merchantReducers from '../../../reducers';
import {
  DownloadDocument,
  UpdateMerchantDetail, UpdateMerchantDetailSuccess,
} from '@modules/profile/actions/merchant-detail.actions';
import { Subscription } from 'rxjs';

import { DocumentApiService } from '@services/document-api.service';
import { MatDialog } from '@angular/material';
import { AddCommentDialogComponent } from '@modules/profile/components/draft/add-comment-dialog/add-comment-dialog.component';
import { IMerchantComment } from '@interfaces/merchant-comment.interface';
import { MERCHANT_COMMENT_TYPE } from '@root/resources/enums/merchant-comment-types.enum';
import { IDocument } from '@interfaces/document.interface';
import { MessengerService } from '@modules/messenger/messenger.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as loginReducers from '@modules/login/reducers';
import {MerchantDetailService} from '@modules/profile/services/merchant-detail.service';
import { isSetInput } from '@modules/login/services/utils';
import { MerchantType } from '@interfaces/merchant-type.interface';

@Component({
  selector: 'edex-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss', '../add-comment-dialog/add-comment-dialog.component.scss']
})
export class CompanyInfoComponent implements OnInit, OnDestroy {
  private merchantDetailSub: Subscription;

  public additionalInfoFormGroup: FormGroup;
  public files: File[] = [];
  public uploadPending$ = this.store.pipe(select(merchantReducers.getUploadDocumentPending));
  public updatePending$ = this.store.pipe(select(merchantReducers.getUpdateMerchantDetailPending));
  public downloadPending$ = this.store.pipe(select(merchantReducers.getDownloadDocumentPending));
  public merchantDetail$ = this.store.pipe(select(merchantReducers.getMerchantDetailCollection));
  public companyDocs: IDocument[] = [];
  public comments: IMerchantComment[] = [];
  public types: MerchantType[] = [];
  public submitted = false;
  public user$ = this.store.pipe(select(loginReducers.getUser));
  public status = '';

  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;

  @Input() userId: string;

  constructor(
    private store: Store<merchantReducers.State>,
    private documentApiService: DocumentApiService,
    private merchantApiService: MerchantDetailService,
    private msgr: MessengerService,
    public dialog: MatDialog,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.getMerchantTypes();

    this.additionalInfoFormGroup = this.fb.group({
      registeredCompanyName: [''],
      tradingName: [''],
      mainBusinessActivity: [''],
      secondaryBusinessActivity: [''],
      companyRegisteredNumber: [''],
      companyType: [''],
      einNumber: [''],
      yearsInBusiness: [''],
      websiteUrl: [''],
      MCC:[''],
      registeredBusinessAddress: [''],
      businessAddressZipcode: [''],
      registeredTradingAddress: [''],
      tradingAddressZipcode: [''],
    });

    this.merchantDetailSub = this.merchantDetail$.subscribe(merchantDetail => {
      if (merchantDetail) {

        const {
          registeredCompanyName, tradingName, mainBusinessActivity, secondaryBusinessActivity,
          companyRegisteredNumber,MCC, companyType, yearsInBusiness, websiteUrl, registeredBusinessAddress,
          businessAddressZipcode, registeredTradingAddress, tradingAddressZipcode, additionalInfoStatus
        } = merchantDetail;
        const einNumber = merchantDetail.merchant.einNumber;
 
        this.companyDocs = merchantDetail.companyDocs;
        this.status = additionalInfoStatus;

        if (registeredCompanyName  ||tradingName || mainBusinessActivity || secondaryBusinessActivity ||
          companyRegisteredNumber || companyType || einNumber ||yearsInBusiness || websiteUrl || registeredBusinessAddress ||
          businessAddressZipcode ||MCC || registeredTradingAddress || tradingAddressZipcode) {
          this.submitted = true;
        } else {
          this.submitted = false;
        }
        this.user$.subscribe((user)=>{
          if(user){
            if(user.role != 'Merchant'){
                this.additionalInfoFormGroup.patchValue({
          registeredCompanyName:'',
          tradingName:'',
          mainBusinessActivity:'',
          MCC:'',
          secondaryBusinessActivity:'',
          companyRegisteredNumber:'',
          companyType:"",
          einNumber:'',
          yearsInBusiness:'',
          websiteUrl:'',
          registeredBusinessAddress:"",
          businessAddressZipcode:'',
          registeredTradingAddress:'',
          tradingAddressZipcode:'',
        }
      );
        this.additionalInfoFormGroup.patchValue({
          registeredCompanyName,
          tradingName,
          mainBusinessActivity,
          MCC,
          secondaryBusinessActivity,
          companyRegisteredNumber,
          companyType,
          einNumber,
          yearsInBusiness,
          websiteUrl,
          registeredBusinessAddress,
          businessAddressZipcode,
          registeredTradingAddress,
          tradingAddressZipcode,
        }
      );
            }
          }
        })
      
        this.additionalInfoFormGroup.patchValue({
          registeredCompanyName: isSetInput(this.additionalInfoFormGroup.get('registeredCompanyName'), registeredCompanyName),
          tradingName: isSetInput(this.additionalInfoFormGroup.get('tradingName'), tradingName),
          mainBusinessActivity: isSetInput(this.additionalInfoFormGroup.get('mainBusinessActivity'), mainBusinessActivity),
          secondaryBusinessActivity: isSetInput(this.additionalInfoFormGroup.get('secondaryBusinessActivity'), secondaryBusinessActivity),
          companyRegisteredNumber: isSetInput(this.additionalInfoFormGroup.get('companyRegisteredNumber'), companyRegisteredNumber),
          companyType: isSetInput(this.additionalInfoFormGroup.get('companyType'), companyType),
          einNumber: isSetInput(this.additionalInfoFormGroup.get('einNumber'), einNumber),
          MCC: isSetInput(this.additionalInfoFormGroup.get('MCC'), MCC),
          yearsInBusiness: isSetInput(this.additionalInfoFormGroup.get('yearsInBusiness'), yearsInBusiness),
          websiteUrl: isSetInput(this.additionalInfoFormGroup.get('websiteUrl'), websiteUrl),
          registeredBusinessAddress: isSetInput(this.additionalInfoFormGroup.get('registeredBusinessAddress'), registeredBusinessAddress),
          businessAddressZipcode: isSetInput(this.additionalInfoFormGroup.get('businessAddressZipcode'), businessAddressZipcode),
          registeredTradingAddress: isSetInput(this.additionalInfoFormGroup.get('registeredTradingAddress'), registeredTradingAddress),
          tradingAddressZipcode: isSetInput(this.additionalInfoFormGroup.get('tradingAddressZipcode'), tradingAddressZipcode),
        }
      );
       
        if (merchantDetail.additionalCompanyInfoComments) {
          this.comments = merchantDetail.additionalCompanyInfoComments;
        }
      }
    });
  }

  getMerchantTypes() {
    this.merchantApiService.getMerchantTypes().subscribe(
      (res) => {
        this.types = res;
      },
      (err) => {
        this.msgr.error(err.message || 'Failed to get merchant types data.');
      }
    );
  }

  onFileChange(event: Event): void {
    const { files } = event.target as HTMLInputElement;
    if (files.item(0)) { 
      const formData = new FormData();
      formData.append('document', files.item(0));
  
      this.documentApiService.uploadDocument(formData).subscribe(
        (res) => {
            const newCompanyDocs =  {
                fileName: res.fileName,
                key: res.key
            };
            this.companyDocs.push(newCompanyDocs);
          // this.store.dispatch(new UpdateMerchantDetail({
          //   userId: this.userId,
          //   merchantDetail: {
          //     // ...this.additionalInfoFormGroup.value,
          //     companyDocs: this.companyDocs,
          //     sectionField: 'additionalInfoStatus'
          //   }
          // }));
  
          this.removeFile(files.item(0));
        },
        (err) => {
          this.msgr.error(err.message || 'Failed to upload the document.');
        }
      );
      this.files.push(files.item(0)); }
  }

  importFile(): void {
    this.fileInput.nativeElement.click();
  }

  removeFile(file): void {
    this.files = this.files.filter(item => item !== file);
  }

  removeCompanyDocs(key): void {
    this.companyDocs = this.companyDocs.filter(doc => doc.key !== key);
      // this.store.dispatch(new UpdateMerchantDetail({
      //     userId: this.userId,
      //     merchantDetail: {
      //         // ...this.additionalInfoFormGroup.value,
      //         sectionField: 'additionalInfoStatus',

      //         companyDocs: this.companyDocs
      //     }
      // }));
  }

  save(file): void {
    const formData = new FormData();
    formData.append('document', file);

    this.documentApiService.uploadDocument(formData).subscribe(
      (res) => {
          const newCompanyDocs =  {
              fileName: res.fileName,
              key: res.key
          };
          this.companyDocs.push(newCompanyDocs);
        // this.store.dispatch(new UpdateMerchantDetail({
        //   userId: this.userId,
        //   merchantDetail: {
        //     // ...this.additionalInfoFormGroup.value,
        //     companyDocs: this.companyDocs,
        //     sectionField: 'additionalInfoStatus'
        //   }
        // }));

        this.removeFile(file);
      },
      (err) => {
        this.msgr.error(err.message || 'Failed to upload the document.');
      }
    );
  }

  submit() {
    if (!this.additionalInfoFormGroup.valid) { return; }

    this.store.dispatch(new UpdateMerchantDetail({
      userId: this.userId,
      merchantDetail: {
        ...this.additionalInfoFormGroup.value,
        companyDocs: this.companyDocs,
        sectionField: 'additionalInfoStatus'
      }
    }));
  }

  download(document: string) {
   this.store.dispatch(new DownloadDocument(document));
  }

  openDialog(): void {
    this.dialog.open(AddCommentDialogComponent, {
      data: {
        merchantId: this.userId,
        commentType: MERCHANT_COMMENT_TYPE.ADDITIONAL_COMPANY_INFO,
        comments: this.comments
      }
    });
  }
onKeyPress(event: any) {
    const regexpNumber = /[0-9\+\-\ ]/;
    let inputCharacter = String.fromCharCode(event.charCode);
    if ( !regexpNumber.test(inputCharacter)) {
      console.log('here');
      event.preventDefault();
    }else{
      console.log('heree')
    }
  }
  approveSection() {
    this.merchantApiService.approveSection(this.userId, 'additionalInfoStatus', true)
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
    this.merchantApiService.approveSection(this.userId, 'additionalInfoStatus', false)
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

  ngOnDestroy(): void {
    if (this.merchantDetailSub) {
      this.merchantDetailSub.unsubscribe();
    }
  }
}
