import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import * as loginReducers from '@modules/login/reducers';
import * as merchantReducers from '../../../reducers';
import * as BankStatements from '@modules/login/components/bankStatements';
import { DownloadDocument, UpdateMerchantDetail, UpdateMerchantDetailSuccess } from '@modules/profile/actions/merchant-detail.actions';
import { Subscription } from 'rxjs';
import { IMerchantComment } from '@interfaces/merchant-comment.interface';
import { AddCommentDialogComponent } from '@modules/profile/components/draft/add-comment-dialog/add-comment-dialog.component';
import { MERCHANT_COMMENT_TYPE } from '@root/resources/enums/merchant-comment-types.enum';
import { MatDialog } from '@angular/material';
import { IDocument } from '@interfaces/document.interface';
import { DocumentApiService } from '@services/document-api.service';
import { MessengerService } from '@modules/messenger/messenger.service';
import { MerchantDetailService } from '@modules/profile/services/merchant-detail.service';
import { isSetInput } from '@modules/login/services/utils';

@Component({
  selector: 'edex-bank-info',
  templateUrl: './bank-info.component.html',
  styleUrls: ['./bank-info.component.scss']
})
export class BankInfoComponent implements OnInit, OnDestroy {
  public bankProcessingStatementFiles: IDocument[] = [];
  public files: File[] = [];
  public bankFormGroup: FormGroup;
  private sub: Subscription;

  public merchantDetail$ = this.store.pipe(select(merchantReducers.getMerchantDetailCollection));
  public downloadPending$ = this.store.pipe(select(merchantReducers.getDownloadDocumentPending));
  public uploadPending$ = this.store.pipe(select(merchantReducers.getUploadDocumentPending));
  public updatePending$ = this.store.pipe(select(merchantReducers.getUpdateMerchantDetailPending));
  public user$ = this.store.pipe(select(loginReducers.getUser));
  public submitted = false;
  public comments: IMerchantComment[] = [];
  public status = '';

  @Input() userId: string;
  public bankStatement = BankStatements.slim_2;
  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;

  constructor(
    private store: Store<loginReducers.State>,
    private fb: FormBuilder,
    private documentApiService: DocumentApiService,
    private msgr: MessengerService,
    private merchantApiService: MerchantDetailService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.bankFormGroup = this.fb.group({
      bankName: [''],
      bankAccountName: [''],
      bankCheckingAccount: [''],
      bankRouting: [''],
      bankProcessingStatement: ['NA'],
      // bankProcessingStatement: ['NA', [Validators.pattern(/^3|6$/)]],
    });

    this.sub = this.merchantDetail$.subscribe((merchantDetail) => {
      if (merchantDetail) {
        const {
          bankName, bankAccountName, bankCheckingAccount, bankRouting, bankProcessingStatement,
          bankProcessingStatementFiles, bankInfoComments, bankInfoStatus
        } = merchantDetail;
        this.status = bankInfoStatus;
        let bankStatementObj;
        if(bankProcessingStatement){
          bankStatementObj =  this.bankStatement.find(i => i.name == bankProcessingStatement);
        }else{
          bankStatementObj ="";
        } 
        this.bankProcessingStatementFiles = bankProcessingStatementFiles;
        this.user$.subscribe((user)=>{
          if(user){
            if(user.role != 'Merchant'){
              this.bankFormGroup.patchValue({
                bankName:'', 
                bankAccountName:'', 
                bankCheckingAccount:'', 
                bankRouting:'',
                bankProcessingStatement:'' ,
              });
              this.bankFormGroup.patchValue({
                bankName, bankAccountName, bankCheckingAccount, bankRouting,bankProcessingStatement:bankStatementObj ,
              });
            }
          }
        })
        
        this.bankFormGroup.patchValue({
          bankName, bankAccountName, bankCheckingAccount, bankRouting,bankProcessingStatement:bankStatementObj ,
        });

        if (bankName || bankAccountName || bankCheckingAccount || bankRouting || bankProcessingStatement) {
          this.submitted = true;
        } else {
          this.submitted = false;
        }

        if (bankInfoComments) {
          this.comments = bankInfoComments;
        }
      }
    });
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
          this.bankProcessingStatementFiles.push(newProcessingStatementFile);
          // this.store.dispatch(new UpdateMerchantDetail({
          //   userId: this.userId,
          //   merchantDetail: {
          //     bankProcessingStatementFiles: this.bankProcessingStatementFiles,
          //     sectionField: 'bankInfoStatus'
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
  } /* fn to compare countries for mat-select */
  compareBankStatement = (c1, c2) => c1.name == c2.name;

  importFile(): void {
    this.fileInput.nativeElement.click();
  }

  removeFile(file): void {
    this.files = this.files.filter(item => item !== file);
  }

  removeBankProcessingStatementFile(key): void {
    this.bankProcessingStatementFiles = this.bankProcessingStatementFiles.filter(doc => doc.key !== key);
    // this.store.dispatch(new UpdateMerchantDetail({
    //   userId: this.userId,
    //   merchantDetail: {
    //     bankProcessingStatementFiles: this.bankProcessingStatementFiles
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
        this.bankProcessingStatementFiles.push(newProcessingStatementFile);
        // this.store.dispatch(new UpdateMerchantDetail({
        //   userId: this.userId,
        //   merchantDetail: {
        //     bankProcessingStatementFiles: this.bankProcessingStatementFiles,
        //     sectionField: 'bankInfoStatus'
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
    if (!this.bankFormGroup.valid) {
      return;
    }
    console.log(this.bankFormGroup.value);
    this.store.dispatch(new UpdateMerchantDetail({
      userId: this.userId,
      merchantDetail: {
        bankName: this.bankFormGroup.controls['bankName'].value,
        bankProcessingStatementFiles: this.bankProcessingStatementFiles,
        bankAccountName: this.bankFormGroup.controls['bankAccountName'].value,
        bankCheckingAccount: this.bankFormGroup.controls['bankCheckingAccount'].value,
        bankRouting: this.bankFormGroup.controls['bankRouting'].value,
        bankProcessingStatement: this.bankFormGroup.controls['bankProcessingStatement'].value.name || '',
        sectionField: 'bankInfoStatus'
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
        commentType: MERCHANT_COMMENT_TYPE.BANK_INFO,
        comments: this.comments
      }
    });
  }

  approveSection() {
    this.merchantApiService.approveSection(this.userId, 'bankInfoStatus', true)
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
    this.merchantApiService.approveSection(this.userId, 'bankInfoStatus', false)
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
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
