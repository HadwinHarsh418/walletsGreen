import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import * as loginReducers from '@modules/login/reducers';
import * as merchantReducers from '../../../reducers';
import {UpdateMerchantDetail, UpdateMerchantDetailSuccess} from '@modules/profile/actions/merchant-detail.actions';
import { Subscription } from 'rxjs';
import { AddCommentDialogComponent } from '@modules/profile/components/draft/add-comment-dialog/add-comment-dialog.component';
import { MERCHANT_COMMENT_TYPE } from '@root/resources/enums/merchant-comment-types.enum';
import { MatDialog } from '@angular/material';
import { DocumentApiService } from '@services/document-api.service';
import { IMerchantComment } from '@interfaces/merchant-comment.interface';
import { MerchantDetailService } from '@modules/profile/services/merchant-detail.service';
import {MessengerService} from '@modules/messenger/messenger.service';
import { IDocument } from '@interfaces/document.interface';
import { isSetInput } from '@modules/login/services/utils';
import { isDefined } from '@angular/compiler/src/util';

@Component({
  selector: 'edex-tax-info',
  templateUrl: './tax-info.component.html',
  styleUrls: ['./tax-info.component.scss']
})
export class TaxInfoComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  public abilityToUploadDocuments: IDocument[] = [];

  public merchantDetail$ = this.store.pipe(select(merchantReducers.getMerchantDetailCollection));
  public downloadPending$ = this.store.pipe(select(merchantReducers.getDownloadDocumentPending));
  public uploadPending$ = this.store.pipe(select(merchantReducers.getUploadDocumentPending));
  public updatePending$ = this.store.pipe(select(merchantReducers.getUpdateMerchantDetailPending));
  public pending$ = this.store.pipe(select(merchantReducers.getUpdateMerchantDetailPending));
  public taxFormGroup: FormGroup;
  public submitted = false;
  public comments: IMerchantComment[] = [];
  public files: File[] = [];
  public user$ = this.store.pipe(select(loginReducers.getUser));
  public status = '';

  @Input() userId: string;
  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;
  constructor(
    private store: Store<loginReducers.State>,
    private merchantApiService: MerchantDetailService,
    private msgr: MessengerService,
    private documentApiService: DocumentApiService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    
  ) { }

  ngOnInit() {
    this.taxFormGroup = this.fb.group({
      federalTaxID: [''],
      stateTaxID: [''],
    });

    this.sub = this.merchantDetail$.subscribe((merchantDetail) => {
     
      if (merchantDetail) {
        this.abilityToUploadDocuments = merchantDetail.abilityToUploadDocuments;
        const {federalTaxID, stateTaxID}= merchantDetail;
        console.log(merchantDetail.taxInfoComments,"merchantDetail.taxInfoComments")
        if (merchantDetail.taxInfoComments) {
          this.comments = merchantDetail.taxInfoComments;
        }
        
        this.user$.subscribe((user)=>{
          if(user){
            if(user.role != 'Merchant'){
              this.taxFormGroup.patchValue({
                federalTaxID:'',
                stateTaxID:'',
              });
              this.taxFormGroup.patchValue({
                federalTaxID,
                stateTaxID,
              });
            }
          }
        })
        this.taxFormGroup.patchValue({
          federalTaxID: isSetInput(this.taxFormGroup.get('federalTaxID'), merchantDetail.federalTaxID),
          stateTaxID: isSetInput(this.taxFormGroup.get('stateTaxID'), merchantDetail.stateTaxID),
        });

        this.status = merchantDetail.taxInfoStatus;

        this.submitted =isDefined(federalTaxID) || isDefined(stateTaxID);
        console.log(merchantDetail.taxInfoComments);

       
      }
    });
  }

  submit() {
    this.store.dispatch(new UpdateMerchantDetail({
      userId: this.userId,
      merchantDetail: {
        ...this.taxFormGroup.value,
        abilityToUploadDocuments: this.abilityToUploadDocuments,
        sectionField: 'taxInfoStatus'
      }
    }));
  }
  onFileChange(event: Event): void {
    const {files} = event.target as HTMLInputElement;
    if (files.item(0)) {
      const formData = new FormData();
    formData.append('document', files.item(0));

    this.documentApiService.uploadDocument(formData).subscribe(
      (res) => {
        const newProcessingStatementFile = {
          fileName: res.fileName,
          key: res.key
        };
        this.abilityToUploadDocuments.push(newProcessingStatementFile);
        // this.store.dispatch(new UpdateMerchantDetail({
        //   userId: this.userId,
        //   merchantDetail: {
        //     abilityToUploadDocuments: this.abilityToUploadDocuments,
        //     sectionField: 'taxInfoStatus'
        //   }
        // }));

        this.removeFile(files.item(0));
      },
      (err) => {
        this.msgr.error(err.message || 'Failed to upload the document.');
      }
    );
      this.files.push(files.item(0));
    }
  }

  importFile(): void {
    this.fileInput.nativeElement.click();
  }

  removeFile(file): void {
    this.files = this.files.filter(item => item !== file);
  }

  removeTaxFile(key): void {
    this.abilityToUploadDocuments = this.abilityToUploadDocuments.filter(doc => doc.key !== key);
    // this.store.dispatch(new UpdateMerchantDetail({
    //   userId: this.userId,
    //   merchantDetail: {
    //     abilityToUploadDocuments: this.abilityToUploadDocuments
    //   }
    // }));
  }

  save(file): void {
    const formData = new FormData();
    formData.append('document', file);

    this.documentApiService.uploadDocument(formData).subscribe(
      (res) => {
        const newProcessingStatementFile = {
          fileName: res.fileName,
          key: res.key
        };
        this.abilityToUploadDocuments.push(newProcessingStatementFile);
        this.store.dispatch(new UpdateMerchantDetail({
          userId: this.userId,
          merchantDetail: {
            abilityToUploadDocuments: this.abilityToUploadDocuments,
            sectionField: 'taxInfoStatus'
          }
        }));

        this.removeFile(file);
      },
      (err) => {
        this.msgr.error(err.message || 'Failed to upload the document.');
      }
    );
  }

  openDialog(): void {
    this.dialog.open(AddCommentDialogComponent, {
      data: {
        merchantId: this.userId,
        commentType: MERCHANT_COMMENT_TYPE.TAX_INFO,
        comments: this.comments
      }
    });
  }

  approveSection() {
    this.merchantApiService.approveSection(this.userId, 'taxInfoStatus', true)
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
    this.merchantApiService.approveSection(this.userId, 'taxInfoStatus', false)
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

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
